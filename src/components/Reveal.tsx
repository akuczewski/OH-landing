"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Owija dziecko w scroll-triggered fade-up (IntersectionObserver, bez zależności
 * animacyjnych). Jednorazowe wejście — nie re-triggeruje przy scrollu w górę/dół,
 * żeby ruch był orkiestrowany, a nie rozproszony po całej stronie.
 */
export default function Reveal({
    children,
    delayMs = 0,
    className = "",
}: {
    children: React.ReactNode;
    delayMs?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );
        observer.observe(el);

        // Siatka bezpieczeństwa: gdyby observer z jakiegoś powodu nigdy nie odpalił
        // (błąd JS gdzie indziej, wolna hydracja, edge case przeglądarki), treść i tak
        // ma się pojawić — nigdy nie zostaje trwale niewidoczna.
        const fallback = window.setTimeout(() => setVisible(true), 1800);

        return () => {
            observer.disconnect();
            window.clearTimeout(fallback);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
            style={visible && delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
        >
            {children}
        </div>
    );
}
