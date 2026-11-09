import { NextResponse, type NextRequest } from "next/server";
import { SITE } from "@/lib/site";

// Kod QR na /pobierz prowadzi na /pobierz?src=qr. Telefon po skanie trafia od razu do
// właściwego sklepu; komputer i każde inne wejście (bez src=qr) widzi zwykłą stronę.
export function proxy(request: NextRequest) {
    if (request.nextUrl.searchParams.get("src") !== "qr") return NextResponse.next();

    const ua = request.headers.get("user-agent") ?? "";
    if (/iPhone|iPad|iPod/i.test(ua)) return NextResponse.redirect(SITE.appStoreUrl, 302);
    if (/Android/i.test(ua)) return NextResponse.redirect(SITE.playStoreUrl, 302);
    return NextResponse.next();
}

export const config = { matcher: "/pobierz" };
