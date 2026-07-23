"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsentServerSnapshot, getConsentSnapshot, subscribeToConsent } from "./consentConfig";

/**
 * GA4 ładuje się WYŁĄCZNIE po zgodzie użytkowniczki (localStorage), nie bezwarunkowo.
 * useSyncExternalStore reaguje natychmiast na zdarzenie z CookieConsent — bez wymogu
 * odświeżenia strony po kliknięciu "Akceptuj".
 */
export default function Analytics({ measurementId }: { measurementId?: string }) {
    const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getConsentServerSnapshot);

    if (!measurementId || consent !== "accepted") return null;

    return (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}');
                `}
            </Script>
        </>
    );
}
