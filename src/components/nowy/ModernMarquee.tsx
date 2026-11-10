"use client";

import { useEffect, useRef } from "react";
import { Flower } from "./ui";

const ITEMS: { text: string; accent?: boolean }[] = [
    { text: "Plan dopasowany do cyklu" },
    { text: "dane zostają na Twoim telefonie", accent: true },
    { text: "Stworzone z ekspertkami" },
    { text: "7 dni za darmo", accent: true },
    { text: "iOS i Android" },
];

function Track({ hidden = false }: { hidden?: boolean }) {
    return (
        <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
            {ITEMS.map((item) => (
                <span key={item.text} className="flex items-center">
                    <span
                        className={`whitespace-nowrap text-2xl md:text-[2.6rem] leading-none tracking-tight ${
                            item.accent ? "italic font-medium text-secondary-green" : "font-semibold text-primary-green"
                        }`}
                    >
                        {item.text}
                    </span>
                    <Flower className="w-6 h-6 md:w-8 md:h-8 mx-6 md:mx-10 shrink-0" />
                </span>
            ))}
        </div>
    );
}

/**
 * Pasek pod hero. Pętla działa w czystym CSS od pierwszego wyświetlenia (.modern-marquee w
 * globals.css). Po starcie strony doładowany GSAP tylko zmienia tempo (playbackRate animacji CSS):
 * przyspiesza i odwraca kierunek razem z przewijaniem, poza ekranem pętla stoi.
 */
export default function ModernMarquee() {
    const root = useRef<HTMLElement>(null);
    const row = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let kill: (() => void) | undefined;
        let cancelled = false;

        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
            const anim = row.current?.getAnimations()[0];
            if (cancelled || !anim || !root.current) return;
            gsap.registerPlugin(ScrollTrigger);
            const speed = { rate: 1 };
            const apply = () => {
                anim.playbackRate = speed.rate;
            };
            const st = ScrollTrigger.create({
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                onToggle: (self) => (self.isActive ? anim.play() : anim.pause()),
                onUpdate: (self) => {
                    const dir = self.direction;
                    const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 5);
                    gsap.to(speed, { rate: dir * boost, duration: 0.25, overwrite: true, onUpdate: apply });
                    gsap.to(speed, { rate: dir, duration: 1.2, delay: 0.25, ease: "power2.out", onUpdate: apply });
                },
            });
            kill = () => st.kill();
        });

        return () => {
            cancelled = true;
            kill?.();
        };
    }, []);

    return (
        <section ref={root} aria-label="OH! Club w skrócie" data-no-select className="relative overflow-hidden border-y border-primary-green/15 bg-light-cream py-6 md:py-9">
            <div ref={row} className="modern-marquee flex w-max">
                <Track />
                <Track hidden />
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-light-cream to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-light-cream to-transparent" aria-hidden="true" />
        </section>
    );
}
