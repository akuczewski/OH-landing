"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wejście sekcji /start — scroll-triggered fade-up (IntersectionObserver, bez
 * zależności). Jednorazowe. Wariant `Reveal.tsx` z cięższą animacją (blur +
 * większy dystans) i maską wipe-up dla nagłówków.
 *
 * Celowo bez `animation-timeline: view()` — sekcje mają `overflow-hidden`
 * (dla poświat), co robi z nich scroll-containery i psuje ten timeline.
 *
 * Siatka bezpieczeństwa: po 1.4 s treść pojawia się niezależnie od observera
 * (błąd JS gdzie indziej, wolna hydracja) — nigdy nie zostaje niewidoczna.
 */
type Props = {
    children: React.ReactNode;
    className?: string;
    variant?: "rise" | "wipe";
    stagger?: number;
};

export default function ScrollReveal({ children, className = "", variant = "rise", stagger = 0 }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [seen, setSeen] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );
        io.observe(el);

        const fallback = window.setTimeout(() => setSeen(true), 1400);

        return () => {
            io.disconnect();
            window.clearTimeout(fallback);
        };
    }, []);

    const base = variant === "wipe" ? "mask-wipe" : "sr";

    return (
        <div
            ref={ref}
            className={`${base} ${seen ? "sr-in" : ""} ${className}`}
            style={stagger ? ({ "--sr-delay": `${stagger}ms` } as React.CSSProperties) : undefined}
        >
            {children}
        </div>
    );
}
