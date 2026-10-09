import { NextRequest, NextResponse } from "next/server";
import { checkConsultationCode } from "@/lib/consultations";

export const runtime = "nodejs";

/**
 * Podgląd kodu rabatowego przed checkoutem — przycisk "Wczytaj" przy polu
 * kodu na /konsultacje. Nie tworzy zamówienia, nie rezerwuje kodu. Finalna
 * cena i walidacja i tak liczą się od nowa w `consultation-checkout`.
 */
export async function POST(request: NextRequest) {
    let body: { code?: string } | null = null;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ valid: false }, { status: 400 });
    }

    const code = body?.code?.trim();
    if (!code) {
        return NextResponse.json({ valid: false }, { status: 400 });
    }

    const result = await checkConsultationCode(code);
    return NextResponse.json(result);
}
