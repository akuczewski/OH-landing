"use client";

import { useState } from "react";

type Billing = "monthly" | "annual";

const plans = [
    {
        name: "OH! Club",
        description: "Jadłospis i pierwsze nawyki dopasowane do Ciebie.",
        regularPrice: 79.99,
        monthlyPromo: 39.99,
        promoPercent: 50,
        annualTotal: 383.95,
        annualMonthly: 32.0,
        features: [
            "Jadłospis 7-dniowy + lista zakupów",
            "Wymiana posiłków bez limitu",
            "Wymiana nawyku programu (1×/mies.)",
            "Baza wiedzy (3 artykuły/mies.)",
            "Rekomendowany trening i rytuał fazowy",
        ],
        highlighted: false,
    },
    {
        name: "OH! Club Care",
        description: "Pełna elastyczność, wszystko bez limitów.",
        regularPrice: 199.0,
        monthlyPromo: 139.3,
        promoPercent: 30,
        annualTotal: 1337.28,
        annualMonthly: 111.44,
        features: [
            "Wszystko z OH! Club",
            "Wymiana nawyku bez limitu",
            "Wymiana treningu i rytuału bez limitu",
            "Pełna baza wiedzy bez ograniczeń",
            "Eksport dziennika dnia do PDF",
            "Czat z ekspertem bez limitu",
        ],
        highlighted: true,
    },
];

function formatPrice(value: number): string {
    return value.toFixed(2).replace(".", ",");
}

export default function PricingCards() {
    const [billing, setBilling] = useState<Billing>("monthly");

    return (
        <div>
            <div className="flex justify-center mb-12">
                <div className="relative inline-flex bg-white rounded-full p-1.5 shadow-sm ring-1 ring-black/[0.05]">
                    <div
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.25rem)] rounded-full bg-primary-green transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                            billing === "annual" ? "translate-x-[calc(100%+0.5rem)]" : "translate-x-0"
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setBilling("monthly")}
                        className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
                            billing === "monthly" ? "text-cream" : "text-text-dark/60"
                        }`}
                    >
                        Miesięcznie
                    </button>
                    <button
                        type="button"
                        onClick={() => setBilling("annual")}
                        className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
                            billing === "annual" ? "text-cream" : "text-text-dark/60"
                        }`}
                    >
                        Rocznie
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-stretch max-w-3xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col rounded-[2rem] p-8 ${
                            plan.highlighted
                                ? "bg-primary-green text-cream shadow-card ring-1 ring-primary-green md:-translate-y-3"
                                : "bg-white text-text-dark ring-1 ring-black/[0.05] shadow-sm"
                        }`}
                    >
                        <span
                            className={`absolute -top-3 right-8 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm ${
                                plan.highlighted ? "bg-cream text-primary-green" : "bg-accent-pink text-text-dark"
                            }`}
                        >
                            7 dni za darmo
                        </span>
                        <h2 className={`font-serif text-2xl font-bold mb-1 ${plan.highlighted ? "text-cream" : "text-primary-green"}`}>
                            {plan.name}
                        </h2>
                        <p className={`text-sm mb-6 ${plan.highlighted ? "text-cream/70" : "text-text-dark/60"}`}>
                            {plan.description}
                        </p>

                        <div className="mb-1 flex items-baseline gap-2">
                            <span className={`text-sm line-through ${plan.highlighted ? "text-cream/50" : "text-text-dark/40"}`}>
                                {formatPrice(plan.regularPrice)} zł
                            </span>
                            <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                    plan.highlighted ? "bg-cream/20 text-cream" : "bg-secondary-green/15 text-primary-green"
                                }`}
                            >
                                -{plan.promoPercent}% dla nowych
                            </span>
                        </div>
                        <div className="mb-6">
                            <span className="font-serif text-4xl font-bold">
                                {formatPrice(billing === "monthly" ? plan.monthlyPromo : plan.annualMonthly)} zł
                            </span>
                            <span className={plan.highlighted ? "text-cream/70" : "text-text-dark/50"}>/mies.</span>
                            {billing === "annual" && (
                                <p className={`text-xs mt-1 ${plan.highlighted ? "text-cream/60" : "text-text-dark/50"}`}>
                                    {formatPrice(plan.annualTotal)} zł rocznie (-20% od ceny promocyjnej)
                                </p>
                            )}
                        </div>

                        <ul className="space-y-3 mb-8 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${plan.highlighted ? "bg-accent-pink" : "bg-secondary-green"}`} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a
                            href="/pobierz"
                            className={`text-center px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                                plan.highlighted
                                    ? "bg-cream text-primary-green hover:bg-white"
                                    : "bg-primary-green text-cream hover:bg-secondary-green"
                            }`}
                        >
                            Pobierz aplikację
                        </a>
                    </div>
                ))}
            </div>

            <p className="text-center text-sm text-text-dark/50 italic mt-12">
                Cena promocyjna obowiązuje dla nowych użytkowniczek. Subskrypcję aktywujesz i
                zarządzasz nią w aplikacji, po zalogowaniu.
            </p>
        </div>
    );
}
