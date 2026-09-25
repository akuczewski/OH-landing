"use client";

import { useEffect, useRef, useState } from "react";

type State =
    | { kind: "loading" }
    | { kind: "processing" }
    | { kind: "ready"; calendlyUrl: string | null }
    | { kind: "failed" };

function trackPurchase() {
    if (typeof window.gtag === "function") {
        window.gtag("event", "purchase", { currency: "PLN" });
    }
    if (typeof window.fbq === "function") {
        window.fbq("track", "Purchase", { currency: "PLN" });
    }
}

export default function ConsultationThankYou({ orderId }: { orderId: string | null }) {
    const [state, setState] = useState<State>(orderId ? { kind: "loading" } : { kind: "failed" });
    const tracked = useRef(false);

    useEffect(() => {
        if (!orderId) return;
        let cancelled = false;
        let attempts = 0;

        const poll = async () => {
            attempts += 1;
            try {
                const res = await fetch(`/api/consultation-status?orderId=${encodeURIComponent(orderId)}`);
                const json = await res.json();
                if (cancelled) return;

                if (json.status === "paid") {
                    if (!tracked.current) {
                        tracked.current = true;
                        trackPurchase();
                    }
                    setState({ kind: "ready", calendlyUrl: json.calendlyUrl ?? null });
                    return;
                }
                if (json.status === "failed" || json.status === "refunded") {
                    setState({ kind: "failed" });
                    return;
                }
                // pending / unknown — webhook mógł jeszcze nie dojść
                if (attempts >= 4) {
                    setState({ kind: "processing" });
                    return;
                }
                setState({ kind: "processing" });
                setTimeout(poll, 2500);
            } catch {
                if (cancelled) return;
                if (attempts >= 4) {
                    setState({ kind: "processing" });
                    return;
                }
                setTimeout(poll, 2500);
            }
        };

        poll();
        return () => {
            cancelled = true;
        };
    }, [orderId]);

    if (state.kind === "loading" || state.kind === "processing") {
        return (
            <div className="bg-white p-10 rounded-[2rem] shadow-card text-center border-2 border-primary-green/15">
                <h1 className="font-serif text-2xl text-primary-green font-bold mb-3">
                    Przetwarzamy płatność…
                </h1>
                <p className="text-text-dark/70 leading-relaxed">
                    Za chwilę pokażemy link do umówienia terminu. Wysłaliśmy go też na Twój
                    adres e-mail wraz z fakturą.
                </p>
                <p className="text-sm text-text-dark/45 mt-4">
                    Jeśli ta strona nie odświeży się w ciągu minuty, sprawdź skrzynkę e-mail.
                </p>
            </div>
        );
    }

    if (state.kind === "failed") {
        return (
            <div className="bg-white p-10 rounded-[2rem] shadow-card text-center border-2 border-primary-green/15">
                <h1 className="font-serif text-2xl text-primary-green font-bold mb-3">
                    Nie udało się potwierdzić płatności
                </h1>
                <p className="text-text-dark/70 leading-relaxed">
                    Jeśli kwota została pobrana, napisz do nas na kontakt@ohclub.app — pomożemy.
                </p>
            </div>
        );
    }

    // ready
    return (
        <div className="bg-white p-10 rounded-[2rem] shadow-card text-center border-2 border-primary-green/15">
            <span className="text-4xl" aria-hidden="true">
                ✅
            </span>
            <h1 className="font-serif text-3xl text-primary-green font-bold mt-3 mb-3">
                Płatność przyjęta
            </h1>
            <p className="text-text-dark/70 leading-relaxed mb-8">
                Ostatni krok: wybierz dogodny termin w kalendarzu eksperta. Link znajdziesz
                też w e-mailu potwierdzającym.
            </p>
            {state.calendlyUrl ? (
                <a
                    href={state.calendlyUrl}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-accent-pink text-primary-green shadow-soft hover:brightness-95 transition-all duration-300"
                >
                    Wybierz termin konsultacji
                </a>
            ) : (
                <p className="text-sm text-text-dark/60">
                    Link do umówienia terminu wysłaliśmy na Twój adres e-mail.
                </p>
            )}
        </div>
    );
}
