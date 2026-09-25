// Fakturownia — automatyczna faktura B2C po opłaceniu konsultacji.
// WYŁĄCZNIE server-side (FAKTUROWNIA_API_TOKEN). Best-effort: błąd nie cofa
// statusu `paid` zamówienia (patrz webhook Stripe).
//
// KSeF: Fakturownia wysyła fakturę do Krajowego Systemu e-Faktur, jeśli konto
// ma podpiętą autoryzację KSeF (prereq A0.2). Bez tego faktura powstaje
// normalnie, tylko nie trafia do KSeF — do 2027 to opcjonalne dla zwolnionych z VAT.

const TOKEN = process.env.FAKTUROWNIA_API_TOKEN ?? "";
const DOMAIN = process.env.FAKTUROWNIA_DOMAIN ?? "";

export type FakturowniaVat = "exempt" | "standard23";

function taxValue(vat: FakturowniaVat): string | number {
    return vat === "standard23" ? 23 : "zw";
}

export type CreateInvoiceInput = {
    email: string;
    itemName: string;
    /** Kwota brutto w groszach (faktycznie obciążona). */
    priceGrosze: number;
    vatTreatment: FakturowniaVat;
};

/**
 * Tworzy fakturę i (jeśli skonfigurowane) wysyła ją e-mailem do klienta.
 * Zwraca id faktury albo null (błąd — logowany, nie rzuca).
 */
export async function createConsultationInvoice(
    input: CreateInvoiceInput,
): Promise<string | null> {
    if (!TOKEN || !DOMAIN) {
        console.error("[fakturownia] Brak FAKTUROWNIA_API_TOKEN / FAKTUROWNIA_DOMAIN");
        return null;
    }

    const priceZl = (input.priceGrosze / 100).toFixed(2);

    const payload = {
        api_token: TOKEN,
        invoice: {
            kind: "vat",
            // B2C — brak NIP, dane minimalne (e-mail do wysyłki).
            buyer_name: "Osoba fizyczna",
            buyer_email: input.email,
            // Faktura płatna z góry, opłacona.
            status: "paid",
            payment_type: "card",
            paid_date: new Date().toISOString().slice(0, 10),
            positions: [
                {
                    name: input.itemName,
                    tax: taxValue(input.vatTreatment),
                    total_price_gross: priceZl,
                    quantity: 1,
                },
            ],
        },
    };

    try {
        const res = await fetch(`https://${DOMAIN}.fakturownia.pl/invoices.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error(`[fakturownia] invoices.json nie-OK: ${res.status}`, json);
            return null;
        }
        const id = json?.id ? String(json.id) : null;

        // Wyślij fakturę e-mailem do klienta (best-effort).
        if (id) {
            fetch(`https://${DOMAIN}.fakturownia.pl/invoices/${id}/send_by_email.json?api_token=${encodeURIComponent(TOKEN)}`, {
                method: "POST",
            }).catch((e) => console.warn("[fakturownia] send_by_email nieudany:", e));
        }
        return id;
    } catch (error) {
        console.error("[fakturownia] błąd:", error);
        return null;
    }
}
