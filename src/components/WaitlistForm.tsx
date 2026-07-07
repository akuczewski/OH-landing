"use client";

import { FormEvent, useState } from "react";
import { MailCheckIcon } from "./icons";

// Dostawca newslettera (np. Brevo — darmowy, bez limitu kontaktów): panel → Contacts →
// Forms → Signup form → Share → skopiuj `action` formularza HTML poniżej.
const NEWSLETTER_ACTION_URL = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION_URL ?? "";
// Nazwa ukrytego pola honeypot z tego samego formularza (jeśli dostawca go generuje).
const NEWSLETTER_HONEYPOT_NAME = process.env.NEXT_PUBLIC_NEWSLETTER_HONEYPOT_NAME ?? "";

type Status = "idle" | "submitting" | "success";
type Platform = "ios" | "android";

// Ścieżki wg Simple Icons (CC0) — logotypy marek pozostają znakami towarowymi ich właścicieli.
function AppleIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
        </svg>
    );
}

function AndroidIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
        </svg>
    );
}

const PLATFORM_OPTIONS: { value: Platform; label: string; Icon: typeof AppleIcon }[] = [
    { value: "ios", label: "iOS", Icon: AppleIcon },
    { value: "android", label: "Android", Icon: AndroidIcon },
];

export default function WaitlistForm({ id, className = "" }: { id?: string; className?: string }) {
    const [status, setStatus] = useState<Status>("idle");
    const [consent, setConsent] = useState(false);
    const [platforms, setPlatforms] = useState<Platform[]>([]);

    const togglePlatform = (value: Platform) => {
        setPlatforms((prev) =>
            prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
        );
    };

    const canSubmit = consent && platforms.length > 0;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        if (!NEWSLETTER_ACTION_URL) {
            // Formularz mailingowy nie jest jeszcze wpięty (brak NEXT_PUBLIC_NEWSLETTER_ACTION_URL).
            e.preventDefault();
            return;
        }
        setStatus("submitting");
        if (typeof window.gtag === "function") {
            window.gtag("event", "waitlist_signup");
        }
        // Submit leci do ukrytego iframe — zostajemy na stronie, dostawca newslettera w tle
        // wysyła e-mail z prośbą o potwierdzenie (double opt-in, zgodne z RODO).
        window.setTimeout(() => setStatus("success"), 500);
    };

    if (status === "success") {
        return (
            <div id={id} className={`bg-white rounded-[2rem] shadow-soft p-6 sm:p-7 text-center scroll-mt-32 ${className}`}>
                <MailCheckIcon className="w-9 h-9 mx-auto mb-2 text-primary-green" />
                <p className="font-serif text-2xl text-primary-green font-bold mb-2">Sprawdź skrzynkę!</p>
                <p className="text-text-dark/70">
                    Wysłaliśmy e-mail z prośbą o potwierdzenie zapisu — kliknij link w wiadomości,
                    żeby dołączyć do listy oczekujących.
                </p>
            </div>
        );
    }

    return (
        <div id={id} className={`bg-white rounded-[2rem] shadow-soft p-6 sm:p-7 scroll-mt-32 ${className}`}>
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="text-sm font-semibold text-text-dark/60">Wybierz platformę:</span>
                <div className="flex gap-2">
                    {PLATFORM_OPTIONS.map(({ value, label, Icon }) => {
                        const selected = platforms.includes(value);
                        return (
                            <button
                                key={value}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => togglePlatform(value)}
                                className={`flex items-center gap-1.5 pl-3 pr-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                                    selected
                                        ? "bg-primary-green border-primary-green text-cream"
                                        : "bg-transparent border-secondary-green/40 text-text-dark/70 hover:border-primary-green/60"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <form
                action={NEWSLETTER_ACTION_URL}
                method="post"
                target="_mc-waitlist"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2.5"
            >
                <input
                    type="email"
                    name="EMAIL"
                    required
                    placeholder="Twój adres e-mail"
                    className="flex-1 px-5 py-3 rounded-full border border-secondary-green/30 bg-light-cream text-text-dark placeholder:text-text-dark/40 focus:outline-none focus:border-primary-green transition-colors"
                />
                {/* Atrybut niestandardowy "PLATFORM" — jeśli dostawca newslettera nie ma takiego
                    pola w formularzu zapisu, po prostu zignoruje tę wartość. */}
                <input type="hidden" name="PLATFORM" value={platforms.join(",")} />
                {NEWSLETTER_HONEYPOT_NAME && (
                    <input
                        type="text"
                        name={NEWSLETTER_HONEYPOT_NAME}
                        tabIndex={-1}
                        defaultValue=""
                        aria-hidden="true"
                        className="hidden"
                    />
                )}
                <button
                    type="submit"
                    disabled={status === "submitting" || !canSubmit}
                    className="bg-text-dark text-cream px-7 py-3 rounded-full text-base font-bold shadow-soft hover:shadow-card transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 whitespace-nowrap"
                >
                    {status === "submitting" ? "Zapisuję…" : "Powiadom mnie o premierze"}
                </button>
            </form>
            <label className="flex items-start gap-2 mt-3.5 text-xs text-text-dark/60 cursor-pointer">
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-0.5"
                />
                <span>
                    Zgadzam się na otrzymywanie e-maili od OH! Club o premierze i nowościach.
                    Mogę wycofać zgodę w każdej chwili.
                </span>
            </label>
            <iframe name="_mc-waitlist" title="Wysyłka formularza zapisu" className="hidden" />
        </div>
    );
}
