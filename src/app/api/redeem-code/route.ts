import { NextRequest, NextResponse } from "next/server";

// Wydawanie kodów promocyjnych (1 miesiąc za darmo) — proxy server-side do Strapi,
// żeby token z prawem zapisu nigdy nie trafił do przeglądarki. Patrz apps/cms/src/api/promo-code
// (custom akcja "claim" — atomowo wydaje jeden nieużyty kod i oznacza go jako claimed).

const STRAPI_URL = process.env.STRAPI_URL ?? "https://useful-sparkle-79935e08b6.strapiapp.com";
const STRAPI_PROMO_TOKEN = process.env.STRAPI_PROMO_TOKEN ?? "";

type Platform = "ios" | "android";

function isPlatform(value: unknown): value is Platform {
    return value === "ios" || value === "android";
}

export async function POST(request: NextRequest) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Nieprawidłowe żądanie" }, { status: 400 });
    }

    const platform = (body as { platform?: unknown } | null)?.platform;
    if (!isPlatform(platform)) {
        return NextResponse.json({ error: 'platform musi być "ios" albo "android"' }, { status: 400 });
    }

    if (!STRAPI_PROMO_TOKEN) {
        console.error("[redeem-code] Brak STRAPI_PROMO_TOKEN — kod nie może zostać wydany");
        return NextResponse.json({ error: "Usługa tymczasowo niedostępna" }, { status: 500 });
    }

    try {
        const res = await fetch(`${STRAPI_URL}/api/promo-codes/claim`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${STRAPI_PROMO_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ platform }),
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`[redeem-code] Strapi odpowiedziało ${res.status} dla platformy ${platform}`);
            return NextResponse.json({ error: "Usługa tymczasowo niedostępna" }, { status: 502 });
        }

        const json = await res.json();
        if (!json.available) {
            return NextResponse.json({ available: false });
        }

        return NextResponse.json({ available: true, redeemUrl: json.redeemUrl as string });
    } catch (error) {
        console.error("[redeem-code] Błąd wywołania Strapi:", error);
        return NextResponse.json({ error: "Usługa tymczasowo niedostępna" }, { status: 502 });
    }
}
