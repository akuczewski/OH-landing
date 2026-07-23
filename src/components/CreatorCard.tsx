"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CreatorSocials } from "@/lib/creatorSocials";
import type { Creator } from "@/lib/strapi";

// Ręczne nadpisanie kadrowania zdjęcia dla konkretnych twórczyń — pole "imageAlign" w Strapi
// jest ustawione pod prezentację w aplikacji mobilnej (inne proporcje kadru). Nasza karta/popup
// na landingu przycina do 4:3, co przy pionowych zdjęciach portretowych może inaczej kadrować
// twarz niż w apce. Dopasowane ręcznie, procent = pozycja w pionie (0% = góra zdjęcia).
const IMAGE_POSITION_OVERRIDES: Record<string, string> = {
    ewa: "50% 8%",
};

function getImagePosition(creator: Creator): string | undefined {
    const key = Object.keys(IMAGE_POSITION_OVERRIDES).find((k) => creator.name.toLowerCase().includes(k));
    return key ? IMAGE_POSITION_OVERRIDES[key] : undefined;
}

function SocialLinks({ socials }: { socials: CreatorSocials }) {
    if (!socials.instagram?.length && !socials.website) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {socials.instagram?.map((handle) => (
                <a
                    key={handle}
                    href={`https://instagram.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold px-3 py-1.5 rounded-full bg-accent-pink/20 text-primary-green hover:bg-accent-pink/40 transition-colors duration-300"
                >
                    @{handle}
                </a>
            ))}
            {socials.website && (
                <a
                    href={socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold px-3 py-1.5 rounded-full bg-secondary-green/20 text-primary-green hover:bg-secondary-green/40 transition-colors duration-300"
                >
                    {socials.website.replace(/^https?:\/\//, "")}
                </a>
            )}
        </div>
    );
}

export default function CreatorCard({ creator, socials }: { creator: Creator; socials?: CreatorSocials }) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    const positionOverride = getImagePosition(creator);
    const photo = creator.imageUrl ? (
        <Image
            src={creator.imageUrl}
            alt={creator.name}
            width={480}
            height={480}
            style={positionOverride ? { objectPosition: positionOverride } : undefined}
            className={`w-full h-full ${creator.imageFit === "contain" ? "object-contain" : "object-cover"} ${!positionOverride && creator.imageAlign === "top" ? "object-top" : !positionOverride ? "object-center" : ""}`}
        />
    ) : (
        <span className="font-serif text-6xl text-primary-green">{creator.name.charAt(0)}</span>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="text-left bg-white rounded-[2rem] shadow-card overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
                <div
                    className="w-full aspect-[4/3] flex items-center justify-center"
                    style={{ backgroundColor: creator.avatarBg }}
                >
                    {photo}
                </div>
                <div className="p-6">
                    <h2 className="font-serif text-xl text-primary-green font-bold">{creator.name}</h2>
                    <p className="text-sm text-text-dark/50 font-semibold mb-2">{creator.role}</p>
                    <p className="text-sm text-text-dark/70 leading-relaxed line-clamp-3 whitespace-pre-line">
                        {creator.bio}
                    </p>
                    <span className="inline-block mt-3 text-sm font-semibold text-primary-green underline underline-offset-4">
                        Zobacz więcej
                    </span>
                </div>
            </button>

            {open && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={creator.name}
                    className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
                >
                    <div
                        className="absolute inset-0 bg-text-dark/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="relative bg-white rounded-[2rem] shadow-card max-w-2xl w-full max-h-[85vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Zamknij"
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-text-dark/60 hover:text-text-dark z-10"
                        >
                            ✕
                        </button>
                        <div
                            className="w-full aspect-[4/3] flex items-center justify-center"
                            style={{ backgroundColor: creator.avatarBg }}
                        >
                            {photo}
                        </div>
                        <div className="p-8">
                            <h2 className="font-serif text-2xl text-primary-green font-bold">{creator.name}</h2>
                            <p className="text-sm text-text-dark/50 font-semibold mb-4">{creator.role}</p>
                            <p className="text-text-dark/80 leading-relaxed whitespace-pre-line">{creator.bio}</p>
                            {socials && <SocialLinks socials={socials} />}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
