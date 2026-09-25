// Resend — e-mail potwierdzający z linkiem do umówienia terminu.
// WYŁĄCZNIE server-side (RESEND_API_KEY). Best-effort — błąd nie cofa `paid`.

const API_KEY = process.env.RESEND_API_KEY ?? "";
// Domena wysyłkowa musi być zweryfikowana w Resend (prereq A0.3).
const FROM = process.env.RESEND_FROM ?? "OH! Club <kontakt@ohclub.app>";

export type ConsultationEmailCopy = {
    subject: string;
    heading: string;
    body: string;
    buttonLabel: string;
    footer: string;
};

export const DEFAULT_EMAIL_COPY: ConsultationEmailCopy = {
    subject: "Twoja konsultacja OH! Club — wybierz termin",
    heading: "Dziękujemy za zakup konsultacji",
    body: "Ostatni krok: wybierz dogodny termin w kalendarzu eksperta. Fakturę wysłaliśmy osobnym e-mailem.",
    buttonLabel: "Wybierz termin konsultacji",
    footer: "Jeśli masz pytania, napisz na kontakt@ohclub.app.",
};

function renderHtml(copy: ConsultationEmailCopy, calendlyUrl: string): string {
    return `<!doctype html><html><body style="margin:0;background:#F2F0ED;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1A1A1A">
  <div style="max-width:520px;margin:0 auto;padding:32px 20px">
    <div style="background:#fff;border-radius:24px;padding:32px;text-align:center">
      <h1 style="font-size:22px;color:#556749;margin:0 0 12px">${escapeHtml(copy.heading)}</h1>
      <p style="font-size:15px;line-height:1.6;color:#4A4238;margin:0 0 24px">${escapeHtml(copy.body)}</p>
      <a href="${escapeAttr(calendlyUrl)}" style="display:inline-block;background:#556749;color:#F9F7F5;text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;font-size:15px">${escapeHtml(copy.buttonLabel)}</a>
      <p style="font-size:12px;color:#4A423880;margin:24px 0 0">${escapeHtml(copy.footer)}</p>
    </div>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
function escapeAttr(s: string): string {
    return s.replace(/"/g, "%22");
}

/** Wysyła e-mail potwierdzający. Zwraca true/false — nie rzuca. */
export async function sendConsultationEmail(input: {
    to: string;
    calendlyUrl: string;
    copy?: Partial<ConsultationEmailCopy>;
}): Promise<boolean> {
    if (!API_KEY) {
        console.error("[resend] Brak RESEND_API_KEY");
        return false;
    }
    const copy = { ...DEFAULT_EMAIL_COPY, ...(input.copy ?? {}) };
    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                from: FROM,
                to: [input.to],
                subject: copy.subject,
                html: renderHtml(copy, input.calendlyUrl),
            }),
        });
        if (!res.ok) {
            console.error(`[resend] emails nie-OK: ${res.status}`, await res.text().catch(() => ""));
            return false;
        }
        return true;
    } catch (error) {
        console.error("[resend] błąd:", error);
        return false;
    }
}
