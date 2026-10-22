// Klient Strapi dla płatnych konsultacji — WYŁĄCZNIE server-side.
// Token STRAPI_CONSULTATION_TOKEN nigdy nie trafia do bundla klienta.
//
// Kontrakt endpointów: patrz apps/cms/src/api/consultation-* i SPEC-konsultacje.md §14.2.

import { mapStrapiExpert, type Expert, type StrapiExpertEntry } from "./consultationFormat";

const STRAPI_URL = process.env.STRAPI_URL ?? "https://useful-sparkle-79935e08b6.strapiapp.com";
// Do odczytu ekspertów wystarcza zwykły read-only token (jak creators);
// do akcji zamówień potrzebny token z uprawnieniami do custom akcji.
const READ_TOKEN = process.env.STRAPI_API_TOKEN ?? "";
const CONSULTATION_TOKEN = process.env.STRAPI_CONSULTATION_TOKEN ?? "";

export type { Expert } from "./consultationFormat";

function resolveMediaUrl(url?: string | null): string | null {
    if (!url) return null;
    return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

const EXPERT_POPULATE = "populate[photo]=true&populate[benefits]=true";
// Format sprzed nowych pól (benefits, slug). Strapi bez nich zwraca 400 "Invalid key",
// więc landing działa niezależnie od kolejności deployu CMS/landing.
const LEGACY_POPULATE = "populate=photo";

/** Wspólny odczyt aktywnych ekspertów (ISR co 1h). Nie rzuca, [] na błąd (jak getCreators). */
async function fetchExperts(extraFilter = "", legacy = false): Promise<Expert[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/experts?${legacy ? LEGACY_POPULATE : EXPERT_POPULATE}&filters[active][$eq]=true${extraFilter}&sort=sortOrder:asc`,
            {
                headers: READ_TOKEN ? { Authorization: `Bearer ${READ_TOKEN}` } : {},
                next: { revalidate: 3600 },
            }
        );
        if (res.status === 400 && !legacy) {
            // Filtr po slugu nie ma sensu bez pola slug → brak wyniku, wołający spróbuje documentId.
            if (extraFilter.includes("[slug]")) return [];
            return fetchExperts(extraFilter, true);
        }
        if (!res.ok) {
            console.warn(`[Strapi] Experts fetch nie-OK: ${res.status}`);
            return [];
        }
        const json = await res.json();
        const entries: StrapiExpertEntry[] = json?.data ?? [];
        return entries.map((e) => mapStrapiExpert(e, resolveMediaUrl));
    } catch (error) {
        console.error("[Strapi] Experts fetch error:", error);
        return [];
    }
}

/** Lista aktywnych ekspertów. */
export function getExperts(): Promise<Expert[]> {
    return fetchExperts();
}

/** Aktywny ekspert po documentId (redirect z `?expertId=` i fallback URL bez sluga). */
export async function getExpertById(documentId: string): Promise<Expert | null> {
    if (!documentId) return null;
    const list = await fetchExperts(`&filters[documentId][$eq]=${encodeURIComponent(documentId)}`);
    return list[0] ?? null;
}

/** Aktywny ekspert po slugu; gdy brak, próbuje documentId (SPEC-new-consultations §5.1). */
export async function getExpertBySlug(slug: string): Promise<Expert | null> {
    if (!slug) return null;
    const list = await fetchExperts(`&filters[slug][$eq]=${encodeURIComponent(slug)}`);
    return list[0] ?? (await getExpertById(slug));
}

export type CodeCheckResult =
    | { valid: true; discountPercent: number }
    | { valid: false };

/**
 * Sprawdza kod rabatowy BEZ tworzenia zamówienia (czysty podgląd dla UI —
 * pokazanie realnej kwoty przed submitem). Źródłem prawdy dla finalnej ceny
 * i tak zawsze zostaje `createPendingOrder`, ten check nigdy nie jest ufany
 * przy obciążaniu karty.
 */
export async function checkConsultationCode(code: string): Promise<CodeCheckResult> {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed || !CONSULTATION_TOKEN) return { valid: false };
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/consultation-codes?filters[code][$eq]=${encodeURIComponent(trimmed)}`,
            {
                headers: { Authorization: `Bearer ${CONSULTATION_TOKEN}` },
                cache: "no-store",
            }
        );
        if (!res.ok) return { valid: false };
        const json = await res.json();
        const entry = json?.data?.[0];
        if (!entry || entry.redeemedAt) return { valid: false };
        return { valid: true, discountPercent: entry.discountPercent ?? 0 };
    } catch {
        return { valid: false };
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
