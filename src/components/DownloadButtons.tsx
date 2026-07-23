"use client";

import { AndroidIcon, AppleIcon } from "./icons";
import { SITE } from "@/lib/site";

function trackDownload(platform: "ios" | "android") {
    if (typeof window.gtag === "function") {
        window.gtag("event", "download_click", { platform });
    }
}

/** Realne przyciski pobrania — App Store i Google Play, jedno źródło prawdy w SITE. */
export default function DownloadButtons({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
            <a
                href={SITE.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDownload("ios")}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-bold shadow-soft hover:shadow-card transition-all duration-300 active:scale-[0.98] bg-text-dark text-cream"
            >
                <AppleIcon className="w-5 h-5" />
                Pobierz na iOS
            </a>
            <a
                href={SITE.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDownload("android")}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-bold shadow-soft hover:shadow-card transition-all duration-300 active:scale-[0.98] bg-text-dark text-cream"
            >
                <AndroidIcon className="w-5 h-5" />
                Pobierz na Androida
            </a>
        </div>
    );
}
