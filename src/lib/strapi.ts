// Klient Strapi dla landingu — wyłącznie server-side (token nigdy w NEXT_PUBLIC_*).
// Zakres: tylko odczyt kolekcji "creators" (Twórcy treści), zgodnie z SPEC-landing-v2.md §5.

const STRAPI_URL = process.env.STRAPI_URL ?? "https://useful-sparkle-79935e08b6.strapiapp.com";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

export type Creator = {
    id: number | string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string | null;
    imageFit: "cover" | "contain";
    imageAlign: "top" | "center";
    avatarBg: string;
};

type StrapiMedia = { url?: string } | null | undefined;

type StrapiCreatorEntry = {
    id: number | string;
    name?: string;
    role?: string;
    bio?: string;
    image?: StrapiMedia;
    imageFit?: string;
    imageAlign?: string;
    avatarBg?: string;
};

function resolveMediaUrl(media: StrapiMedia): string | null {
    if (!media?.url) return null;
    return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

/**
 * Pobiera listę twórców treści ze Strapi (ISR co 1h — patrz `revalidate` w wywołaniu `fetch`).
 * Nie rzuca wyjątkiem na błąd/timeout — zwraca [] i loguje, żeby build/render nie padał
 * (strona `/tworcy` renderuje w takim wypadku stan pusty).
 */
export async function getCreators(): Promise<Creator[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/creators?populate=image&sort=order:asc`,
            {
                headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {},
                next: { revalidate: 3600 },
            }
        );

        if (!res.ok) {
            // 403/404 to zwykle brak/nieprawidłowy STRAPI_API_TOKEN albo brak publicznego
            // dostępu do kolekcji "creators" w ustawieniach Strapi — stan oczekiwany do
            // skonfigurowania (SPEC-landing-v2.md §11, O4), nie wyjątek. console.warn, żeby
            // nie wywoływać czerwonego error-overlaya Next.js w dev dla tego przypadku.
            console.warn(`[Strapi] Creators fetch nie-OK: ${res.status}`);
            return [];
        }

        const json = await res.json();
        const entries: StrapiCreatorEntry[] = json?.data ?? [];

        return entries.map((entry) => ({
            id: entry.id,
            name: entry.name ?? "",
            role: entry.role ?? "",
            bio: entry.bio ?? "",
            imageUrl: resolveMediaUrl(entry.image),
            imageFit: entry.imageFit === "contain" ? "contain" : "cover",
            imageAlign: entry.imageAlign === "top" ? "top" : "center",
            avatarBg: entry.avatarBg ?? "#EDE5D8",
        }));
    } catch (error) {
        console.error("[Strapi] Creators fetch error:", error);
        return [];
    }
}
