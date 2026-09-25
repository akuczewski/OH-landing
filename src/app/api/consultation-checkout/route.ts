import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { getStripe } from "@/lib/stripe";
import { createPendingOrder, getExperts } from "@/lib/consultations";

export const runtime = "nodejs";

/**
 * Start checkoutu konsultacji.
 * 1. CMS create-pending liczy cenę server-side (z rabatem, jeśli kod poprawny)
 *    i tworzy zamówienie `pending`.
 * 2. Tworzymy Stripe Checkout Session z KWOTĄ Z CMS (nigdy z inputu klienta).
 * 3. Zwracamy URL do przekierowania.
 */
export async function POST(request: NextRequest) {
    let body: { expertId?: string; email?: string; code?: string } | null = null;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Nieprawidłowe żądanie" }, { status: 400 });
    }

    const expertId = body?.expertId?.trim();
    const email = body?.email?.trim();
    const code = body?.code?.trim() || undefined;

    if (!expertId || !email || !/.+@.+\..+/.test(email)) {
        return NextResponse.json({ error: "Podaj poprawny adres e-mail" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRAPI_CONSULTATION_TOKEN) {
        console.error("[consultation-checkout] Brak STRIPE_SECRET_KEY / STRAPI_CONSULTATION_TOKEN");
        return NextResponse.json({ error: "Płatności są chwilowo niedostępne" }, { status: 500 });
    }

    // Nazwa eksperta do opisu pozycji na Stripe (czytelne na paragonie).
    const experts = await getExperts();
    const expert = experts.find((e) => e.id === expertId);
    if (!expert) {
        return NextResponse.json({ error: "Wybrany ekspert jest niedostępny" }, { status: 400 });
    }

    const pending = await createPendingOrder({ expertId, email, code });
    if (!pending.ok) {
        return NextResponse.json({ error: pending.error }, { status: pending.status === 400 ? 400 : 502 });
    }

    try {
        const session = await getStripe().checkout.sessions.create({
            mode: "payment",
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: "pln",
                        unit_amount: pending.priceGrosze,
                        product_data: {
                            name: `Konsultacja online: ${expert.name}`,
                            description: expert.title || expert.specialization || undefined,
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: { orderId: pending.orderId },
            payment_intent_data: { metadata: { orderId: pending.orderId } },
            success_url: `${SITE.url}/konsultacje/dziekujemy?session_id={CHECKOUT_SESSION_ID}&orderId=${pending.orderId}`,
            cancel_url: `${SITE.url}/konsultacje?anulowano=1`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("[consultation-checkout] Stripe error:", error);
        return NextResponse.json({ error: "Nie udało się rozpocząć płatności" }, { status: 502 });
    }
}
