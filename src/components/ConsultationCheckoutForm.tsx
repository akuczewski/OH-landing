"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Expert } from "@/lib/consultations";

function formatPrice(grosze: number): string {
    return `${(grosze / 100).toFixed(2).replace(".", ",")} zł`;
}

// Wymóg prawny (SPEC-konsultacje.md §12a) — SZKIC, do przeglądu prawnika przed produkcją.
const CONSENT_TEXT =
    "Wyrażam zgodę na rozpoczęcie świadczenia usługi konsultacji przed upływem 14-dniowego terminu do odstąpienia od umowy i przyjmuję do wiadomości, że w związku z tym utracę prawo odstąpienia od umowy z chwilą pełnego wykonania usługi, zgodnie z art. 38 pkt 1 ustawy z dnia 30 maja 2014 r. o prawach konsumenta.";

function trackBeginCheckout(expert: Expert) {
    if (typeof window.gtag === "function") {
        window.gtag("event", "begin_checkout", {
            currency: "PLN",
            value: expert.priceGrosze / 100,
            items: [{ item_name: expert.name, item_category: expert.specialization }],
        });
    }
    if (typeof window.fbq === "function") {
        window.fbq("track", "InitiateCheckout", {
            currency: "PLN",
            value: expert.priceGrosze / 100,
        });
    }
}

export default function ConsultationCheckoutForm({ experts }: { experts: Expert[] }) {
    const params = useSearchParams();
    const cancelled = params.get("anulowano") === "1";

    const prefillExpertId = params.get("expertId");
    const initialExpert =
        experts.find((e) => e.id === prefillExpertId)?.id ?? experts[0]?.id ?? "";

    const [expertId, setExpertId] = useState(initialExpert);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(params.get("code")?.toUpperCase() ?? "");
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Podgląd rabatu przed submitem — "Wczytaj" przy polu kodu. Przechowuje KOD,
    // dla którego % jest ważny, żeby edycja pola po sprawdzeniu unieważniała podgląd
    // (finalna walidacja i tak zawsze liczy się od nowa server-side przy płatności).
    const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
    const [codeChecking, setCodeChecking] = useState(false);
    const [codeInvalid, setCodeInvalid] = useState(false);

    const selected = useMemo(() => experts.find((e) => e.id === expertId), [experts, expertId]);
    const emailValid = /.+@.+\..+/.test(email.trim());
    const canSubmit = !!expertId && emailValid && consent && !loading;

    const normalizedCode = code.trim().toUpperCase();
    const activeDiscountPercent =
        appliedDiscount && appliedDiscount.code === normalizedCode ? appliedDiscount.percent : 0;
    const displayPriceGrosze = selected
        ? Math.round((selected.priceGrosze * (100 - activeDiscountPercent)) / 100)
        : 0;

    async function handleCheckCode() {
        if (!normalizedCode || codeChecking) return;
        setCodeChecking(true);
        setCodeInvalid(false);
        try {
            const res = await fetch("/api/consultation-code-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: normalizedCode }),
            });
            const json = await res.json();
            if (json.valid) {
                setAppliedDiscount({ code: normalizedCode, percent: json.discountPercent });
            } else {
                setAppliedDiscount(null);
                setCodeInvalid(true);
            }
        } catch {
            setAppliedDiscount(null);
            setCodeInvalid(true);
        } finally {
            setCodeChecking(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit || !selected) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/consultation-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    expertId,
                    email: email.trim(),
                    code: code.trim() || undefined,
                }),
            });
            const json = await res.json();
            if (!res.ok || !json.url) {
                setError(json.error ?? "Coś poszło nie tak. Spróbuj ponownie.");
                setLoading(false);
                return;
            }
            trackBeginCheckout(selected);
            window.location.href = json.url;
        } catch {
            setError("Coś poszło nie tak. Spróbuj ponownie.");
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {cancelled && (
                <p className="text-sm text-text-dark/70 bg-white rounded-2xl px-4 py-3 ring-1 ring-black/[0.05]">
                    Płatność została przerwana. Możesz spróbować ponownie poniżej.
                </p>
            )}

            {/* Wybór eksperta */}
            <fieldset className="space-y-3">
                <legend className="font-serif text-xl text-primary-green font-bold mb-1">
                    Wybierz konsultację
                </legend>
                {experts.map((ex) => (
                    <label
                        key={ex.id}
                        className={`flex items-center gap-4 p-4 rounded-[1.5rem] bg-white cursor-pointer transition-all ring-2 ${
                            expertId === ex.id
                                ? "ring-primary-green shadow-card"
                                : "ring-black/[0.05] hover:ring-primary-green/30"
                        }`}
                    >
                        <input
                            type="radio"
                            name="expert"
                            value={ex.id}
                            checked={expertId === ex.id}
                            onChange={() => setExpertId(ex.id)}
                            className="sr-only"
                        />
                        <span className="text-3xl" aria-hidden="true">
                            {ex.avatarEmoji || "🩺"}
                        </span>
                        <span className="flex-1">
                            <span className="block font-bold text-text-dark">{ex.name}</span>
                            {ex.title && (
                                <span className="block text-sm text-text-dark/60">{ex.title}</span>
                            )}
                        </span>
                        <span className="font-serif text-lg text-primary-green font-bold whitespace-nowrap">
                            {formatPrice(ex.priceGrosze)}
                        </span>
                    </label>
                ))}
            </fieldset>
            <p className="text-xs text-text-dark/45 px-1 -mt-3">Ceny brutto (zawierają VAT).</p>

            {selected?.description && (
                <p className="text-sm text-text-dark/60 leading-relaxed px-1">{selected.description}</p>
            )}

            {/* E-mail */}
            <div>
                <label htmlFor="email" className="block font-semibold text-text-dark mb-1.5">
                    Adres e-mail
                </label>
                <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@email.pl"
                    required
                    className="w-full rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.08] focus:ring-2 focus:ring-primary-green outline-none"
                />
                <p className="text-xs text-text-dark/50 mt-1.5">
                    Na ten adres wyślemy fakturę i link do umówienia terminu.
                </p>
            </div>

            {/* Kod rabatowy */}
            <div>
                <label htmlFor="code" className="block font-semibold text-text-dark mb-1.5">
                    Masz kod rabatowy? <span className="font-normal text-text-dark/50">(opcjonalnie)</span>
                </label>
                <div className="flex gap-2">
                    <input
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.toUpperCase());
                            setCodeInvalid(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleCheckCode();
                            }
                        }}
                        placeholder="KO-XXXXXX"
                        className="flex-1 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.08] focus:ring-2 focus:ring-primary-green outline-none tracking-widest"
                    />
                    <button
                        type="button"
                        onClick={handleCheckCode}
                        disabled={!normalizedCode || codeChecking}
                        className="px-5 rounded-2xl bg-white ring-1 ring-black/[0.08] font-semibold text-sm text-text-dark hover:ring-primary-green/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {codeChecking ? "..." : "Wczytaj"}
                    </button>
                </div>
                {activeDiscountPercent > 0 && (
                    <p className="text-xs text-secondary-green font-semibold mt-1.5">
                        Kod poprawny, rabat {activeDiscountPercent}% zastosowany.
                    </p>
                )}
                {codeInvalid && (
                    <p className="text-xs text-red-600 mt-1.5">
                        Kod rabatowy jest nieprawidłowy albo już wykorzystany.
                    </p>
                )}
                {!activeDiscountPercent && !codeInvalid && code.trim() && (
                    <p className="text-xs text-text-dark/50 mt-1.5">
                        Kliknij „Wczytaj”, żeby sprawdzić kod przed płatnością.
                    </p>
                )}
            </div>

            {/* Zgoda na odstąpienie */}
            <label className="flex gap-3 text-sm text-text-dark/75 leading-relaxed bg-white rounded-2xl p-4 ring-1 ring-black/[0.05] cursor-pointer">
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 shrink-0 w-4 h-4 accent-primary-green"
                />
                <span>{CONSENT_TEXT}</span>
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-4 rounded-full text-base font-bold bg-accent-pink text-primary-green shadow-soft hover:brightness-95 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
                {loading
                    ? "Przekierowuję do płatności…"
                    : selected
                      ? `Zapłać ${formatPrice(displayPriceGrosze)}`
                      : "Zapłać"}
            </button>

            <p className="text-xs text-text-dark/45 text-center leading-relaxed">
                Płatność obsługuje Stripe (karta, BLIK, Przelewy24). Po opłaceniu otrzymasz
                link do samodzielnego umówienia terminu w kalendarzu eksperta.
            </p>
        </form>
    );
}
