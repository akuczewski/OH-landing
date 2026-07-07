// Zgody autorek na publikację potwierdzone (SPEC-landing-v2.md §11, O3 — zamknięte).
// Treści przepisane wg granicy hybrydowej (bez claimów medycznych typu insulina/kortyzol,
// bez wątku leczenia dziecka).

import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const featured = {
    quote: "Wróciła mi energia, a dni okresu przestały być męką — mogę normalnie funkcjonować.",
    context: "opinia o współpracy z Klaudią",
};

const supporting = [
    {
        quote: "Dieta stała się kolorowa i różnorodna, przestałam mieć ochotę na słodkie, a skóra i samopoczucie wyraźnie się poprawiły.",
        context: "opinia o współpracy z Klaudią",
    },
    {
        quote: "Ogrom przekazanej wiedzy, proste i smaczne jadłospisy, świetny kontakt i pomoc w każdej chwili.",
        context: "opinia o współpracy z Klaudią",
    },
    {
        quote: "Podchodzi do tematu holistycznie i bardzo indywidualnie — czułam się wysłuchana na każdym etapie.",
        context: "opinia o współpracy z Klaudią",
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-28 px-6 bg-light-cream">
            <span className="thread-dot hidden lg:block" style={{ top: "3.5rem" }} aria-hidden="true" />

            <div className="max-w-6xl mx-auto lg:pl-16">
                <Reveal>
                    <Eyebrow>Głosy kobiet</Eyebrow>
                    <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold mt-5 mb-16 leading-[1.15] tracking-tight max-w-2xl">
                        Co mówią kobiety, które z nami pracowały
                    </h2>
                </Reveal>

                <div className="grid lg:grid-cols-5 gap-6 items-start">
                    <Reveal className="lg:col-span-3">
                        <div className="bg-white rounded-[2.5rem] shadow-card p-10 md:p-12 ring-1 ring-black/[0.03] -rotate-1">
                            <p className="font-serif text-2xl md:text-3xl text-primary-green leading-snug mb-6">
                                &quot;{featured.quote}&quot;
                            </p>
                            <p className="text-sm font-semibold text-text-dark/50 uppercase tracking-[0.1em]">{featured.context}</p>
                        </div>
                    </Reveal>

                    <div className="lg:col-span-2 flex flex-col gap-5">
                        {supporting.map((t, i) => (
                            <Reveal key={t.quote} delayMs={(i + 1) * 110} className={i === 1 ? "lg:translate-x-3" : ""}>
                                <div className="bg-white rounded-[2rem] shadow-sm ring-1 ring-black/[0.03] p-6">
                                    <p className="text-text-dark/80 leading-relaxed italic mb-3">&quot;{t.quote}&quot;</p>
                                    <p className="text-xs font-semibold text-text-dark/40 uppercase tracking-[0.1em]">{t.context}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
