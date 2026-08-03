"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
    COOKIE_CONSENT_EVENT,
    COOKIE_CONSENT_KEY,
    getConsentServerSnapshot,
    getConsentSnapshot,
    subscribeToConsent,
    type CookieConsentValue,
} from "./consentConfig";

export default function CookieConsent() {
    const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getConsentServerSnapshot);
    const visible = consent === null;

    const decide = (value: CookieConsentValue) => {
        window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
        window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md z-[60] bg-white rounded-[1.75rem] shadow-card ring-1 ring-black/[0.05] p-6">
            <p className="text-sm text-text-dark/80 leading-relaxed mb-4">
                Używamy plików cookie do analizy ruchu na stronie i pomiaru skuteczności reklam
                (Google Analytics, Meta Pixel). Niezbędne cookies są zawsze aktywne. Więcej w{" "}
                <Link href="/cookies" className="underline hover:text-primary-green">
                    Polityce Cookies
                </Link>
                .
            </p>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => decide("accepted")}
                    className="flex-1 bg-primary-green text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary-green transition-colors duration-300"
                >
                    Akceptuj wszystkie
                </button>
                <button
                    type="button"
                    onClick={() => decide("rejected")}
                    className="flex-1 bg-transparent border border-primary-green/30 text-primary-green px-5 py-2.5 rounded-full text-sm font-semibold hover:border-primary-green transition-colors duration-300"
                >
                    Odrzuć
                </button>
            </div>
        </div>
    );
}
