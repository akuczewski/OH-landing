"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { discountedGrosze, formatPrice, type Expert } from "@/lib/consultationFormat";

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

/**
 * Checkout jednej konsultacji na stronie eksperta. Kod z URL (`?code=`, np. z apki)
 * zatwierdza się automatycznie, bez klikania "Wczytaj" (SPEC-new-consultations §5.4).
 */
export default function ConsultationCheckoutForm({
    expert,
    onDiscountChange,
}: {
    expert: Expert;
    /** Aktualny podgląd rabatu (0 = brak) dla bloku ceny nad formularzem. */
    onDiscountChange?: (percent: number) => void;
}) {
    const params = useSearchParams();
    const cancelled = params.get("anulowano") === "1";
    const urlCode = params.get("code")?.trim().toUpperCase() ?? "";

    const [email, setEmail] = useState("");
    const [code, setCode] = useState(urlCode);
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Podgląd rabatu przed submitem — "Wczytaj" przy polu kodu. Przechowuje KOD,
    // dla którego % jest ważny, żeby edycja pola po sprawdzeniu unieważniała podgląd
    // (finalna walidacja i tak zawsze liczy się od nowa server-side przy płatności).
    const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
    const [codeInvalid, setCodeInvalid] = useState(false);

    // Sprawdzanie kodu blokuje "Zapłać", żeby wyścig nie skończył się płatnością pełnej ceny.
    const [codeChecking, setCodeChecking] = useState(!!urlCode);
    const emailValid = /.+@.+\..+/.test(email.trim());
    const canSubmit = emailValid && consent && !loading && !codeChecking;

    const normalizedCode = code.trim().toUpperCase();
    const activeDiscountPercent =
        appliedDiscount && appliedDiscount.code === normalizedCode ? appliedDiscount.percent : 0;
    const codeApproved = activeDiscountPercent > 0;
    const displayPriceGrosze = discountedGrosze(expert.priceGrosze, activeDiscountPercent);

    useEffect(() => {
        onDiscountChange?.(activeDiscountPercent);
    }, [activeDiscountPercent, onDiscountChange]);

    // Auto-zatwierdzenie kodu z URL; ref chroni przed podwójnym wywołaniem w StrictMode.
    const autoChecked = useRef(false);
    useEffect(() => {
        if (autoChecked.current || !urlCode) return;
        autoChecked.current = true;
        void handleCheckCode(urlCode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlCode]);

    function handleChangeCode() {
        setAppliedDiscount(null);
        setCodeInvalid(false);
        setCode("");
    }

    async function handleCheckCode(codeToCheck = normalizedCode) {
        if (!codeToCheck) {
            setCodeChecking(false);
            return;
        }
        setCodeChecking(true);
        setCodeInvalid(false);
        try {
            const res = await fetch("/api/consultation-code-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: codeToCheck }),
            });
            const json = await res.json();
            if (json.valid) {
                setAppliedDiscount({ code: codeToCheck, percent: json.discountPercent });
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
        if (!canSubmit) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/consultation-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    expertId: expert.id,
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
            trackBeginCheckout(expert);
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
                {codeApproved ? (
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-secondary-green/15 px-4 py-3 ring-1 ring-secondary-green/40">
                        <span className="text-sm font-semibold text-primary-green">
                            Kod <span className="tracking-widest">{normalizedCode}</span> · −{activeDiscountPercent}%
                            zastosowany
                        </span>
                        <button
                            type="button"
                            onClick={handleChangeCode}
                            className="text-sm font-semibold text-text-dark/60 underline underline-offset-4 hover:text-text-dark"
                        >
                            Zmień kod
                        </button>
                    </div>
                ) : (
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
                                    if (!codeChecking) handleCheckCode();
                                }
                            }}
                            placeholder="KO-XXXXXX"
                            disabled={codeChecking}
                            className="flex-1 min-w-0 rounded-2xl bg-white px-4 py-3 ring-1 ring-black/[0.08] focus:ring-2 focus:ring-primary-green outline-none tracking-widest disabled:opacity-60"
                        />
                        <button
                            type="button"
                            onClick={() => handleCheckCode()}
                            disabled={!normalizedCode || codeChecking}
                            className="px-5 rounded-2xl bg-white ring-1 ring-black/[0.08] font-semibold text-sm text-text-dark hover:ring-primary-green/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {codeChecking ? "Sprawdzam…" : "Wczytaj"}
                        </button>
                    </div>
                )}
                {codeInvalid && (
                    <p className="text-xs text-red-600 mt-1.5">
                        Kod rabatowy jest nieprawidłowy albo już wykorzystany. Możesz zapłacić bez kodu albo
                        wpisać inny.
                    </p>
                )}
                {!codeApproved && !codeInvalid && !codeChecking && code.trim() && (
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
                    : codeChecking
                      ? "Sprawdzam kod…"
                      : `Zapłać ${formatPrice(displayPriceGrosze)}`}
            </button>

            <p className="text-xs text-text-dark/45 text-center leading-relaxed">
                Płatność obsługuje Stripe (karta, BLIK, Przelewy24). Po opłaceniu otrzymasz
                link do samodzielnego umówienia terminu w kalendarzu eksperta.
            </p>
        </form>
    );
}
