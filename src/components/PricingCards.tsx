"use client";

import { useState } from "react";

type Billing = "monthly" | "annual";

const plans = [
    {
        name: "OH! Club",
        description: "Jadłospis i pierwsze nawyki dopasowane do Ciebie.",
        monthlyPrice: 49.99,
        annualPrice: 479.99,
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
        monthlyPrice: 129.99,
        annualPrice: 1239.99,
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

/** Realna % oszczędność planu rocznego względem 12× ceny miesięcznej. */
function annualSavingsPercent(monthlyPrice: number, annualPrice: number): number | null {
    const yearOfMonthly = monthlyPrice * 12;
    if (yearOfMonthly <= 0) return null;
    const percent = Math.round((1 - annualPrice / yearOfMonthly) * 100);
    return percent > 0 ? percent : null;
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
                {plans.map((plan) => {
                    // Przy rocznym planie duża cena to ekwiwalent miesięczny (annualPrice / 12) —
                    // realna kwota pobierana jednorazowo raz w roku jest podana niżej, małym drukiem.
                    const displayPrice = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice / 12;
                    const savings = annualSavingsPercent(plan.monthlyPrice, plan.annualPrice);

                    return (
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

                            <div className="mb-6">
                                <span className="font-serif text-4xl font-bold">
                                    {formatPrice(displayPrice)} zł
                                </span>
                                <span className={plan.highlighted ? "text-cream/70" : "text-text-dark/50"}>
                                    /mies.
                                </span>
                                {billing === "annual" && (
                                    <p className={`text-xs mt-1 ${plan.highlighted ? "text-cream/60" : "text-text-dark/50"}`}>
                                        {formatPrice(plan.annualPrice)} zł płatne raz w roku
                                        {savings ? `, oszczędzasz ${savings}%` : ""}
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
                    );
                })}
            </div>

            <p className="text-center text-sm text-text-dark/50 italic mt-12">
                Subskrypcję aktywujesz i zarządzasz nią w aplikacji, po zalogowaniu.
            </p>
        </div>
    );
}
