"use client";

import { useState } from "react";
import { AndroidIcon, AppleIcon } from "./icons";

type Platform = "ios" | "android";
type Status = "idle" | "loading" | "soldout" | "error";

function trackClaim(platform: Platform, outcome: string) {
    if (typeof window.gtag === "function") {
        window.gtag("event", "claim_code_click", { platform, outcome });
    }
}

/** Przyciski iOS/Android na /odbierz — wydają jednorazowy kod promocyjny przez /api/redeem-code
 * i przekierowują na link odbioru w App Store / Google Play. */
export default function ClaimCodeButtons({ className = "" }: { className?: string }) {
    const [status, setStatus] = useState<Record<Platform, Status>>({ ios: "idle", android: "idle" });
    const isBusy = status.ios === "loading" || status.android === "loading";

    async function handleClaim(platform: Platform) {
        setStatus((s) => ({ ...s, [platform]: "loading" }));
        try {
            const res = await fetch("/api/redeem-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ platform }),
            });
            const json = await res.json();

            if (!res.ok || json.error) {
                setStatus((s) => ({ ...s, [platform]: "error" }));
                trackClaim(platform, "error");
                return;
            }

            if (!json.available) {
                setStatus((s) => ({ ...s, [platform]: "soldout" }));
                trackClaim(platform, "soldout");
                return;
            }

            trackClaim(platform, "success");
            window.location.href = json.redeemUrl;
        } catch {
            setStatus((s) => ({ ...s, [platform]: "error" }));
            trackClaim(platform, "error");
        }
    }

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleClaim("ios")}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-bold shadow-soft hover:shadow-card transition-all duration-300 active:scale-[0.98] bg-text-dark text-cream disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <AppleIcon className="w-5 h-5" />
                    {status.ios === "loading" ? "Generuję kod…" : "Odbierz na iOS"}
                </button>
                <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleClaim("android")}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-bold shadow-soft hover:shadow-card transition-all duration-300 active:scale-[0.98] bg-text-dark text-cream disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <AndroidIcon className="w-5 h-5" />
                    {status.android === "loading" ? "Generuję kod…" : "Odbierz na Androida"}
                </button>
            </div>

            {status.ios === "soldout" || status.android === "soldout" ? (
                <p className="text-sm text-text-dark/70 max-w-md text-center">
                    Akcja promocyjna właśnie się zakończyła - wszystkie kody zostały już odebrane.
                </p>
            ) : null}
            {status.ios === "error" || status.android === "error" ? (
                <p className="text-sm text-red-600 max-w-md text-center">
                    Coś poszło nie tak. Spróbuj ponownie za chwilę.
                </p>
            ) : null}
        </div>
    );
}
