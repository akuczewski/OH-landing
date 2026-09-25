import { NextRequest, NextResponse } from "next/server";
import { getOrderStatus } from "@/lib/consultations";

export const runtime = "nodejs";

/**
 * Status zamówienia dla strony "dziękujemy" (polling). Server-side odczyt z CMS
 * dedykowanym tokenem — klient nigdy nie dotyka Strapi.
 */
export async function GET(request: NextRequest) {
    const orderId = request.nextUrl.searchParams.get("orderId");
    if (!orderId) {
        return NextResponse.json({ error: "brak orderId" }, { status: 400 });
    }
    const { status, calendlyUrl } = await getOrderStatus(orderId);
    return NextResponse.json({ status, calendlyUrl }, {
        headers: { "Cache-Control": "no-store" },
    });
}
