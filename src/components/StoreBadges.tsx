"use client";

import { AndroidIcon, AppleIcon } from "./icons";
import { SITE } from "@/lib/site";

function trackDownload(platform: "ios" | "android") {
    if (typeof window.gtag === "function") {
        window.gtag("event", "download_click", { platform });
    }
}

const BADGE =
    "inline-flex items-center gap-3 pl-5 pr-7 py-3 rounded-full bg-text-dark text-cream shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] active:translate-y-0";

/** Przyciski pobrania w stylu odznak sklepów (dwie linie, logo platformy) — wariant dla /pobierz. */
export default function StoreBadges({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
            <a
                href={SITE.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDownload("ios")}
                className={BADGE}
            >
                <AppleIcon className="w-7 h-7 shrink-0" />
                <span className="flex flex-col items-start leading-none">
                    <span className="text-[11px] font-medium text-cream/75">Pobierz na</span>
                    <span className="text-xl font-bold mt-1">iOS</span>
                </span>
            </a>
            <a
                href={SITE.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDownload("android")}
                className={BADGE}
            >
                <AndroidIcon className="w-7 h-7 shrink-0" />
                <span className="flex flex-col items-start leading-none">
                    <span className="text-[11px] font-medium text-cream/75">Pobierz na</span>
                    <span className="text-xl font-bold mt-1">Androida</span>
                </span>
            </a>
        </div>
    );
}
