// Kit (newsletter) — zapis subskrybenta przez API v4. WYŁĄCZNIE server-side (KIT_API_KEY).
// Konfiguracja konta (utworzona przez API 2026-11-18): tag "ebook-badania-hormonalne",
// pola własne "Zgoda marketingowa" (key: zgoda_marketingowa) i "Zrodlo zapisu" (key: zrodlo_zapisu).

const API_KEY = process.env.KIT_API_KEY ?? "";
const API_URL = "https://api.kit.com/v4";

export const KIT_TAGS = {
    ebookBadaniaHormonalne: Number(process.env.KIT_EBOOK_TAG_ID ?? 26104791),
} as const;

export type KitSubscribeInput = {
    email: string;
    tagId: number;
    /** Dowód zgody: data, wersja i treść klauzuli zapisywane w polu subskrybenta. */
    consent: string;
    source: string;
};

async function kitPost(path: string, body: unknown): Promise<Response> {
    return fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "X-Kit-Api-Key": API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
    });
}

/**
 * Tworzy (albo aktualizuje) subskrybenta i dodaje tag. Zwraca "ok", "invalid_email" albo "error".
 * Nie rzuca wyjątków.
 */
export async function subscribeToKit(input: KitSubscribeInput): Promise<"ok" | "invalid_email" | "error"> {
    if (!API_KEY) {
        console.error("[kit] Brak KIT_API_KEY");
        return "error";
    }
    try {
        const created = await kitPost("/subscribers", {
            email_address: input.email,
            fields: { zgoda_marketingowa: input.consent, zrodlo_zapisu: input.source },
        });
        if (created.status === 422) return "invalid_email";
        if (!created.ok) {
            console.error(`[kit] Tworzenie subskrybenta: HTTP ${created.status}`);
            return "error";
        }
        const tagged = await kitPost(`/tags/${input.tagId}/subscribers`, { email_address: input.email });
        if (!tagged.ok) {
            // Subskrybent jest już na liście; brak tagu nie blokuje pobrania.
            console.error(`[kit] Tagowanie: HTTP ${tagged.status}`);
        }
        return "ok";
    } catch (error) {
        console.error("[kit] Błąd połączenia:", error);
        return "error";
    }
}
