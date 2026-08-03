"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsentServerSnapshot, getConsentSnapshot, subscribeToConsent } from "./consentConfig";

/**
 * Meta Pixel ładuje się WYŁĄCZNIE po zgodzie użytkowniczki (localStorage), analogicznie
 * do Analytics.tsx (GA4) — ten sam mechanizm zgody z CookieConsent.
 */
export default function MetaPixel({ pixelId }: { pixelId?: string }) {
    const consent = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getConsentServerSnapshot);

    if (!pixelId || consent !== "accepted") return null;

    return (
        <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
            `}
        </Script>
    );
}
