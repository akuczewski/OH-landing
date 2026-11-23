import { NextRequest, NextResponse } from "next/server";
import { CONSENT_TEXT, CONSENT_VERSION, EBOOK_PDF_URL, EMAIL_RE } from "@/lib/ebook";
import { KIT_TAGS, subscribeToKit } from "@/lib/kit";

// Zapis na newsletter (Kit) w zamian za ebook "Badania hormonalne".
// Zgoda marketingowa jest warunkiem pobrania (decyzja 2026-11-18). Klucz Kit nigdy nie trafia do przeglądarki.

// Prosty limit prób na instancję (ochrona przed zalewem zgłoszeń z jednego adresu IP).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    attempts.set(ip, recent);
    if (attempts.size > 5000) attempts.clear();
    return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
    let body: { email?: unknown; consent?: unknown; website?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Nieprawidłowe żądanie" }, { status: 400 });
    }

    // Pole-pułapka niewidoczne dla ludzi: wypełnione = bot. Udajemy sukces, nic nie zapisujemy.
    if (typeof body.website === "string" && body.website.trim() !== "") {
        return NextResponse.json({ ok: true, downloadUrl: EBOOK_PDF_URL });
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!EMAIL_RE.test(email) || email.length > 254) {
        return NextResponse.json({ error: "Podaj poprawny adres e-mail." }, { status: 400 });
    }
    if (body.consent !== true) {
        return NextResponse.json({ error: "Zaznacz zgodę, aby otrzymać ebook." }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
        return NextResponse.json({ error: "Zbyt wiele prób. Spróbuj ponownie za kilka minut." }, { status: 429 });
    }

    const result = await subscribeToKit({
        email,
        tagId: KIT_TAGS.ebookBadaniaHormonalne,
        consent: `tak | ${new Date().toISOString()} | ${CONSENT_VERSION} | ${CONSENT_TEXT}`,
        source: "landing: ebook Badania hormonalne",
    });

    if (result === "invalid_email") {
        return NextResponse.json({ error: "Ten adres e-mail wygląda na niepoprawny." }, { status: 400 });
    }
    if (result === "error") {
        return NextResponse.json({ error: "Nie udało się zapisać. Spróbuj ponownie za chwilę." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, downloadUrl: EBOOK_PDF_URL });
}
