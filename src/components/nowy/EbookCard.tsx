"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CONSENT_TEXT, EMAIL_RE } from "@/lib/ebook";
import { Accent } from "./ui";

type Status = "closed" | "form" | "sending" | "done";

/**
 * Karta "Darmowy ebook". Pobranie wymaga podania e-maila i zgody na newsletter (zapis do Kit
 * przez /api/ebook). Po zapisie pokazujemy przycisk pobrania PDF.
 */
export function EbookCard({ photo }: { photo: string }) {
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

    return (
        <div data-reveal className="mt-6 rounded-[2rem] bg-white p-6 md:p-7">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-20 h-24 shrink-0 rounded-2xl overflow-hidden bg-accent-pink/30">
                    <Image src={photo} alt="Okładka ebooka Badania hormonalne" fill sizes="80px" className="object-cover object-top" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="font-serif font-bold text-2xl text-primary-green">
                        Darmowy ebook: <Accent>Badania hormonalne</Accent>
                    </h3>
                    <p className="text-text-dark/70 mt-1">
                        Co zbadać i jak przygotować się do diagnostyki. Masz już wyniki? Omów je ze specjalistką z OH! Club Care.
                    </p>
                </div>
                {status === "closed" ? (
                    <button
                        type="button"
                        onClick={() => setStatus("form")}
                        className="rounded-full bg-accent-pink px-7 py-3 font-bold text-text-dark hover:brightness-95 transition"
                    >
                        Pobierz
                    </button>
                ) : null}
            </div>

            {status === "form" || status === "sending" ? (
                <form onSubmit={submit} noValidate className="mt-6 border-t border-text-dark/10 pt-6 max-w-2xl mx-auto">
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
                            className="flex-1 rounded-full border border-text-dark/15 bg-light-cream px-5 py-3 text-text-dark outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20"
                        />
                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="rounded-full bg-primary-green px-7 py-3 font-bold text-cream transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
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
                <div role="status" className="mt-6 border-t border-text-dark/10 pt-6 text-center">
                    <p className="font-serif font-bold text-xl text-primary-green">Dziękujemy, jesteś na liście.</p>
                    <p className="text-text-dark/70 mt-1">Ebook jest gotowy do pobrania.</p>
                    <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 rounded-full bg-accent-pink px-7 py-3 font-bold text-text-dark hover:brightness-95 transition"
                    >
                        Pobierz PDF
                    </a>
                </div>
            ) : null}
        </div>
    );
}
