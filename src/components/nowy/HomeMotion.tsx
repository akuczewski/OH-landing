"use client";

import { useEffect } from "react";

/**
 * Ruch strony głównej przy przewijaniu, sterowany atrybutami w markupie (sekcje zostają serwerowe):
 * - data-reveal: jednorazowe wejście (ScrollTrigger.batch, naturalny stagger),
 * - data-parallax: lekka głębia telefonów (scrub, tylko transform),
 * - data-ring-seg / data-bar: koło cyklu rysuje się, słupki rosną.
 * Wejście hero jest w czystym CSS (globals.css), żeby nie czekać na JS i nie opóźniać LCP.
 * GSAP ładuje się dopiero po starcie strony (osobny chunk), więc nie obciąża pierwszego renderu.
 * Do czasu załadowania failsafe w CSS pokazuje treść po 2,5 s; "ogranicz ruch" = brak animacji.
 */
export default function HomeMotion() {
    useEffect(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let revert: (() => void) | undefined;
        let cancelled = false;

        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
            if (cancelled) return;
            gsap.registerPlugin(ScrollTrigger);
            document.documentElement.classList.add("motion-live");

            const ctx = gsap.context(() => {
                gsap.set("[data-reveal]", { y: 40, autoAlpha: 0 });
                ScrollTrigger.batch("[data-reveal]", {
                    start: "top 88%",
                    once: true,
                    onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09, ease: "power3.out", overwrite: true }),
                });

                gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
                    const depth = Number(el.dataset.parallax) || 50;
                    gsap.fromTo(el, { y: depth }, { y: -depth, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
                });

                gsap.utils.toArray<SVGCircleElement>("[data-ring-seg]").forEach((seg, i) => {
                    gsap.from(seg, {
                        attr: { "stroke-dasharray": `0 ${seg.getAttribute("data-full") ?? "0"}` },
                        duration: 1,
                        delay: i * 0.18,
                        ease: "power2.out",
                        scrollTrigger: { trigger: seg.ownerSVGElement ?? seg, start: "top 85%", once: true },
                    });
                });

                gsap.from("[data-bar]", {
                    scaleY: 0,
                    transformOrigin: "50% 100%",
                    duration: 0.7,
                    stagger: 0.07,
                    ease: "back.out(1.6)",
                    scrollTrigger: { trigger: "[data-bar]", start: "top 90%", once: true },
                });
            });

            // Zdjęcia doładowują się leniwie i zmieniają wysokość strony: przelicz wyzwalacze.
            const refresh = () => ScrollTrigger.refresh();
            window.addEventListener("load", refresh);
            revert = () => {
                window.removeEventListener("load", refresh);
                ctx.revert();
            };
        });

        return () => {
            cancelled = true;
            revert?.();
        };
    }, []);

    return null;
}
