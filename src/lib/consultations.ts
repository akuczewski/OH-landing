// Klient Strapi dla płatnych konsultacji — WYŁĄCZNIE server-side.
// Token STRAPI_CONSULTATION_TOKEN nigdy nie trafia do bundla klienta.
//
// Kontrakt endpointów: patrz apps/cms/src/api/consultation-* i SPEC-konsultacje.md §14.2.

const STRAPI_URL = process.env.STRAPI_URL ?? "https://useful-sparkle-79935e08b6.strapiapp.com";
// Do odczytu ekspertów wystarcza zwykły read-only token (jak creators);
// do akcji zamówień potrzebny token z uprawnieniami do custom akcji.
const READ_TOKEN = process.env.STRAPI_API_TOKEN ?? "";
const CONSULTATION_TOKEN = process.env.STRAPI_CONSULTATION_TOKEN ?? "";

export type Expert = {
    id: string;
    name: string;
    title: string;
    specialization: string;
    description: string;
    avatarEmoji: string;
    photoUrl: string | null;
    priceGrosze: number;
};

type StrapiExpertEntry = {
    documentId: string;
    name?: string;
    title?: string;
    specialization?: string;
    description?: string;
    avatarEmoji?: string;
    photo?: { url?: string } | null;
    priceGrosze?: number;
    active?: boolean;
};

function resolveMediaUrl(url?: string | null): string | null {
    if (!url) return null;
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

/**
 * Lista aktywnych ekspertów (ISR co 1h). Nie rzuca — [] na błąd (jak getCreators).
 */
export async function getExperts(): Promise<Expert[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/experts?populate=photo&filters[active][$eq]=true&sort=sortOrder:asc`,
            {
                headers: READ_TOKEN ? { Authorization: `Bearer ${READ_TOKEN}` } : {},
                next: { revalidate: 3600 },
            }
        );
        if (!res.ok) {
            console.warn(`[Strapi] Experts fetch nie-OK: ${res.status}`);
            return [];
        }
        const json = await res.json();
        const entries: StrapiExpertEntry[] = json?.data ?? [];
        return entries.map((e) => ({
            id: e.documentId,
            name: e.name ?? "",
            title: e.title ?? "",
            specialization: e.specialization ?? "",
            description: e.description ?? "",
            avatarEmoji: e.avatarEmoji ?? "",
            photoUrl: resolveMediaUrl(e.photo?.url),
            priceGrosze: e.priceGrosze ?? 24900,
        }));
    } catch (error) {
        console.error("[Strapi] Experts fetch error:", error);
        return [];
    }
}

export type CreatePendingResult =
    | { ok: true; orderId: string; priceGrosze: number }
    | { ok: false; error: string; status: number };

/** Woła CMS create-pending. Cena liczona po stronie CMS, nie tutaj. */
export async function createPendingOrder(input: {
    expertId: string;
    email: string;
    code?: string;
}): Promise<CreatePendingResult> {
    const res = await fetch(`${STRAPI_URL}/api/consultation-orders/create-pending`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CONSULTATION_TOKEN}`,
        },
        body: JSON.stringify(input),
        cache: "no-store",
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
        // Strapi zwraca { error: { message } } dla badRequest.
        return {
            ok: false,
            status: res.status,
            error: json?.error?.message ?? "Nie udało się rozpocząć płatności",
        };
    }
    return { ok: true, orderId: json.orderId, priceGrosze: json.priceGrosze };
}

/** Woła CMS mark-paid (z webhooka Stripe). Best-effort — loguje błąd. */
export async function markOrderPaid(input: {
    orderId: string;
    stripeSessionId: string;
    stripePaymentIntentId?: string | null;
}): Promise<{ ok: boolean; calendlyUrl?: string | null }> {
    try {
        const res = await fetch(`${STRAPI_URL}/api/consultation-orders/mark-paid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${CONSULTATION_TOKEN}`,
            },
            body: JSON.stringify(input),
            cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            console.error(`[consultations] mark-paid nie-OK: ${res.status}`, json);
            return { ok: false };
        }
        return { ok: true, calendlyUrl: json.calendlyUrl ?? null };
    } catch (error) {
        console.error("[consultations] mark-paid error:", error);
        return { ok: false };
    }
}

export type OrderStatus = {
    status: "pending" | "paid" | "failed" | "refunded" | "unknown";
    calendlyUrl: string | null;
};

/**
 * Edytowalna treść e-maila potwierdzającego — z content-type `screen-text`
 * (klucze konsultacje_email_*). Zwraca tylko klucze, które admin ustawił;
 * reszta bierze się z DEFAULT_EMAIL_COPY w lib/resend.ts.
 */
export async function getConsultationEmailCopy(): Promise<Record<string, string>> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/screen-texts?filters[key][$startsWith]=konsultacje_email_&pagination[pageSize]=20`,
            { headers: READ_TOKEN ? { Authorization: `Bearer ${READ_TOKEN}` } : {}, next: { revalidate: 300 } }
        );
        if (!res.ok) return {};
        const json = await res.json();
        const out: Record<string, string> = {};
        for (const e of json?.data ?? []) {
            const short = String(e.key).replace("konsultacje_email_", "");
            if (e.value) out[short] = e.value;
        }
        return out;
    } catch {
        return {};
    }
}

export type OrderForFulfillment = {
    email: string;
    priceGrosze: number;
    calendlyUrl: string | null;
    expertName: string;
    vatTreatment: "exempt" | "standard23";
};

/** Pełne dane zamówienia potrzebne do faktury + e-maila (webhook Stripe). */
export async function getOrderForFulfillment(orderId: string): Promise<OrderForFulfillment | null> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/consultation-orders?filters[documentId][$eq]=${encodeURIComponent(orderId)}&populate=expert&pagination[pageSize]=1`,
            { headers: { Authorization: `Bearer ${CONSULTATION_TOKEN}` }, cache: "no-store" }
        );
        if (!res.ok) return null;
        const json = await res.json();
        const o = json?.data?.[0];
        if (!o) return null;
        return {
            email: o.email,
            priceGrosze: o.priceGrosze,
            calendlyUrl: o.calendlyUrlSent ?? o.expert?.calendlyUrl ?? null,
            expertName: o.expert?.name ?? "Konsultacja OH! Club",
            vatTreatment: o.expert?.vatTreatment === "standard23" ? "standard23" : "exempt",
        };
    } catch {
        return null;
    }
}

/** Dopisuje id faktury / czas wysłania e-maila do zamówienia (best-effort). */
export async function patchOrderFulfillment(
    orderId: string,
    data: { fakturowniaInvoiceId?: string; emailSentAt?: string },
): Promise<void> {
    try {
        await fetch(`${STRAPI_URL}/api/consultation-orders/${encodeURIComponent(orderId)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${CONSULTATION_TOKEN}`,
            },
            body: JSON.stringify({ data }),
            cache: "no-store",
        });
    } catch (error) {
        console.warn("[consultations] patch fulfillment nieudany:", error);
    }
}

/** Odczyt statusu zamówienia dla strony "dziękujemy" (po documentId). */
export async function getOrderStatus(orderId: string): Promise<OrderStatus> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/consultation-orders?filters[documentId][$eq]=${encodeURIComponent(orderId)}&populate=expert&pagination[pageSize]=1`,
            {
                headers: { Authorization: `Bearer ${CONSULTATION_TOKEN}` },
                cache: "no-store",
            }
        );
        if (!res.ok) return { status: "unknown", calendlyUrl: null };
        const json = await res.json();
        const order = json?.data?.[0];
        if (!order) return { status: "unknown", calendlyUrl: null };
        return {
            status: order.status ?? "unknown",
            calendlyUrl: order.calendlyUrlSent ?? order.expert?.calendlyUrl ?? null,
        };
    } catch {
        return { status: "unknown", calendlyUrl: null };
    }
}
