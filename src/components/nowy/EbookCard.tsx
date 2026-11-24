"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CONSENT_TEXT, EMAIL_RE } from "@/lib/ebook";
import { Accent, CheckIcon } from "./ui";

const EBOOK_COVER = "/nowy-landing/ebook-okladka.jpg";

type Status = "closed" | "form" | "sending" | "done";

/**
 * Karta "Darmowy ebook". Pobranie wymaga podania e-maila i zgody na newsletter (zapis do Kit
 * przez /api/ebook). Po zapisie pokazujemy przycisk pobrania PDF.
 */
export function EbookCard() {
    const [status, setStatus] = useState<Status>("closed");
    const [email, setEmail] = useState("");
    const [consent, setConsent] = useState(false);
    const [website, setWebsite] = useState(""); // pole-pułapka na boty
    const [error, setError] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const emailValid = EMAIL_RE.test(email.trim());
    const canSubmit = emailValid && consent && status !== "sending";

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;
        setStatus("sending");
        setError(null);
        try {
            const res = await fetch("/api/ebook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), consent, website }),
            });
            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.ok) {
                setError(json.error ?? "Nie udało się zapisać. Spróbuj ponownie za chwilę.");
                setStatus("form");
                return;
            }
            setDownloadUrl(json.downloadUrl);
            setStatus("done");
            // Analityka ładuje się tylko po zgodzie na cookies, więc bez zgody te wywołania nic nie robią.
            window.gtag?.("event", "generate_lead", { lead_source: "ebook_badania_hormonalne" });
            window.fbq?.("track", "Lead", { content_name: "ebook_badania_hormonalne" });
        } catch {
            setError("Brak połączenia. Spróbuj ponownie za chwilę.");
            setStatus("form");
        }
    }

    const formOpen = status === "form" || status === "sending";

    return (
        <div data-reveal className="mt-6 grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] rounded-[2rem] bg-white overflow-hidden">
            {/* Okładka ebooka w delikatnej ramce tabletu */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-accent-pink/35 via-accent-pink/20 to-light-cream px-8 py-10 md:py-14">
                <div className="w-44 md:w-56 rotate-[-2deg] rounded-[1.6rem] bg-white p-2 ring-1 ring-primary-green/10 shadow-[0_18px_40px_-18px_rgba(85,103,73,0.35)]">
                    <div className="relative aspect-[1081/1390] rounded-[1.15rem] overflow-hidden ring-1 ring-black/5">
                        <Image src={EBOOK_COVER} alt="Okładka ebooka Badania hormonalne" fill sizes="(min-width: 768px) 224px, 176px" className="object-cover" />
                    </div>
                </div>
            </div>

            <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center">
                <span className="self-start inline-flex items-center gap-2 rounded-full bg-accent-pink/45 pl-4 pr-1.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-pink-deep">
                    Darmowy ebook
                    <span className="rounded-full bg-primary-green px-2 py-0.5 text-[10px] tracking-wider text-cream">PDF</span>
                </span>
                <h3 className="font-serif font-bold text-3xl md:text-[2.4rem] leading-tight tracking-tight text-primary-green mt-4">
                    Badania <Accent>hormonalne</Accent>
                </h3>
                <p className="text-text-dark/70 mt-3 md:text-lg leading-relaxed">
                    Co zbadać i jak przygotować się do diagnostyki. Masz już wyniki? Omów je ze specjalistką z OH! Club Care.
                </p>
                <ul className="flex flex-wrap gap-2 mt-5">
                    {["Wskazania", "Przygotowanie do badań", "Lista badań"].map((t) => (
                        <li key={t} className="flex items-center gap-2 rounded-full bg-light-cream pl-1.5 pr-3.5 py-1.5 text-sm font-semibold text-primary-green">
                            <span className="w-5 h-5 rounded-full bg-primary-green text-cream flex items-center justify-center">
                                <CheckIcon className="w-3 h-3" />
                            </span>
                            {t}
                        </li>
                    ))}
                </ul>

                {status === "closed" ? (
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-7">
                        <button
                            type="button"
                            onClick={() => setStatus("form")}
                            className="inline-flex items-center gap-2.5 rounded-full bg-accent-pink px-7 py-3.5 font-bold text-text-dark shadow-soft hover:brightness-95 hover:shadow-card active:scale-[0.98] transition-all duration-300"
                        >
                            <DownloadIcon />
                            Pobierz ebook
                        </button>
                        <ConsultationLink />
                    </div>
                ) : null}

                {formOpen ? (
                    <form onSubmit={submit} noValidate className="mt-7 border-t border-text-dark/10 pt-6">
                        <label htmlFor="ebook-email" className="block text-sm font-semibold text-text-dark mb-2">
                            Twój e-mail
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                id="ebook-email"
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                autoFocus
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="imie@przyklad.pl"
                                className="flex-1 min-w-0 rounded-full border border-text-dark/15 bg-light-cream px-5 py-3 text-text-dark outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                            />
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="rounded-full bg-primary-green px-7 py-3 font-bold text-cream transition hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {status === "sending" ? "Zapisuję..." : "Odbierz ebook"}
                            </button>
                        </div>

                        {/* Pole-pułapka: ukryte dla ludzi i czytników ekranu, boty je wypełniają. */}
                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        />

                        <label className="mt-4 flex items-start gap-3 text-sm text-text-dark/75 leading-relaxed cursor-pointer">
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-1 h-4 w-4 shrink-0 accent-primary-green"
                            />
                            <span>
                                {CONSENT_TEXT} Szczegóły w{" "}
                                <Link href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-primary-green">
                                    polityce prywatności
                                </Link>
                                .
                            </span>
                        </label>

                        {error ? (
                            <p role="alert" className="mt-3 text-sm font-semibold text-accent-pink-deep">
                                {error}
                            </p>
                        ) : null}
                    </form>
                ) : null}

                {status === "done" && downloadUrl ? (
                    <div role="status" className="mt-7 border-t border-text-dark/10 pt-6">
                        <p className="font-serif font-bold text-xl text-primary-green">Dziękujemy, jesteś na liście.</p>
                        <p className="text-text-dark/70 mt-1">Ebook jest gotowy do pobrania.</p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-4">
                            <a
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 rounded-full bg-accent-pink px-7 py-3.5 font-bold text-text-dark shadow-soft hover:brightness-95 active:scale-[0.98] transition-all duration-300"
                            >
                                <DownloadIcon />
                                Pobierz PDF
                            </a>
                            <ConsultationLink />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function ConsultationLink() {
    return (
        <Link
            href="/konsultacje"
            className="group inline-flex items-center gap-1.5 font-semibold text-primary-green border-b border-primary-green/40 pb-0.5 hover:border-primary-green transition-colors"
        >
            Umów konsultację w OH! Club Care
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </Link>
    );
}

function DownloadIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 20h14" />
        </svg>
    );
}
