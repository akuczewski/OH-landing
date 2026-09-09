"use client";

import Link from "next/link";
import { useRef } from "react";

/**
 * CTA z magnetycznym hoverem (kursor „przyciąga" przycisk) + ikoną strzałki
 * zagnieżdżoną we własnym kółku (button-in-button). Efekt magnetyczny jest
 * czysto wizualny (transform), wyłączany przy prefers-reduced-motion i na
 * urządzeniach dotykowych (brak zdarzeń pointer z hover).
 */
export default function MagneticButton({
    href,
    children,
    className = "",
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const raf = useRef<number | null>(null);

    const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
        if (prefersReduced || e.pointerType === "touch") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        if (raf.current) cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(() => {
            el.style.transform = `translate3d(${mx * 0.22}px, ${my * 0.35}px, 0)`;
        });
    }

    function reset() {
        const el = ref.current;
        if (!el) return;
        if (raf.current) cancelAnimationFrame(raf.current);
        el.style.transform = "translate3d(0, 0, 0)";
    }

    return (
        <Link
            ref={ref}
            href={href}
            onPointerMove={onMove}
            onPointerLeave={reset}
            className={`group inline-flex items-center gap-3 rounded-full bg-primary-green py-3 pl-7 pr-3 text-base font-bold text-light-cream shadow-soft transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-secondary-green hover:shadow-card active:scale-[0.97] ${className}`}
        >
            <span>{children}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-light-cream/15 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M7 17 17 7M9 7h8v8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
        </Link>
    );
}
