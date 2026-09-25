import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { STRIPE_WEBHOOK_SECRET, getStripe } from "@/lib/stripe";
import {
    getConsultationEmailCopy,
    getOrderForFulfillment,
    markOrderPaid,
    patchOrderFulfillment,
} from "@/lib/consultations";
import { createConsultationInvoice } from "@/lib/fakturownia";
import { sendConsultationEmail } from "@/lib/resend";

// Stripe SDK wymaga Node runtime. Body MUSI być czytane jako surowy tekst
// (request.text()) i przekazane do constructEvent PRZED jakimkolwiek
// request.json() — inaczej weryfikacja podpisu cicho pada.
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    const sig = request.headers.get("stripe-signature");
    if (!sig || !STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: "brak podpisu" }, { status: 400 });
    }

    const raw = await request.text();

    let event: Stripe.Event;
    try {
        event = getStripe().webhooks.constructEvent(raw, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.warn("[stripe-webhook] nieprawidłowy podpis:", (err as Error).message);
        return NextResponse.json({ error: "nieprawidłowy podpis" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (!orderId) {
            console.error("[stripe-webhook] checkout.session.completed bez metadata.orderId", session.id);
            // 200, żeby Stripe nie retryował w nieskończoność czegoś, czego nie naprawimy.
            return NextResponse.json({ received: true });
        }

        // mark-paid jest idempotentne (retry Stripe -> alreadyProcessed).
        // KRYTYCZNE — musi się udać, inaczej 500 i Stripe ponawia.
        const result = await markOrderPaid({
            orderId,
            stripeSessionId: session.id,
            stripePaymentIntentId:
                typeof session.payment_intent === "string" ? session.payment_intent : null,
        });

        if (!result.ok) {
            return NextResponse.json({ error: "mark-paid nieudany" }, { status: 500 });
        }

        // Fakturownia + Resend — BEST-EFFORT. Błąd nie cofa `paid` i nie
        // powoduje retry Stripe (zwracamy 200). Resend/fakturę można dosłać ręcznie.
        try {
            const order = await getOrderForFulfillment(orderId);
            if (order) {
                const invoiceId = await createConsultationInvoice({
                    email: order.email,
                    itemName: `Konsultacja online: ${order.expertName}`,
                    priceGrosze: order.priceGrosze,
                    vatTreatment: order.vatTreatment,
                });

                let emailSent = false;
                if (order.calendlyUrl) {
                    const copy = await getConsultationEmailCopy();
                    emailSent = await sendConsultationEmail({
                        to: order.email,
                        calendlyUrl: order.calendlyUrl,
                        copy,
                    });
                }

                await patchOrderFulfillment(orderId, {
                    ...(invoiceId ? { fakturowniaInvoiceId: invoiceId } : {}),
                    ...(emailSent ? { emailSentAt: new Date().toISOString() } : {}),
                });
            }
        } catch (err) {
            console.error("[stripe-webhook] fulfillment (faktura/email) błąd:", err);
        }
    }

    return NextResponse.json({ received: true });
}
