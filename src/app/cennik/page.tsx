import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Cennik",
    description: "Poznaj plany OH! Club i wybierz ten, który najlepiej dopasuje się do Twojego cyklu.",
};

const plans = [
    {
        name: "Basic",
        price: "99 zł",
        period: "/mies.",
        description: "Jadłospis i pierwsze nawyki dopasowane do Ciebie.",
        features: [
            "Jadłospis 7-dniowy + lista zakupów",
            "Wymiana posiłków bez limitu",
            "Wymiana nawyku programu (1×/mies.)",
            "Baza wiedzy (3 artykuły/mies.)",
            "Rekomendowany trening i rytuał fazowy",
            "Czat z ekspertem (10 wiad./mies.)",
        ],
        highlighted: false,
        cta: "Pobierz aplikację",
    },
    {
        name: "Premium",
        price: "149 zł",
        period: "/mies.",
        description: "Pełna elastyczność, wszystko bez limitów.",
        features: [
            "Wszystko z Basic",
            "Wymiana nawyku bez limitu",
            "Wymiana treningu i rytuału bez limitu",
            "Pełna baza wiedzy bez ograniczeń",
            "Eksport dziennika dnia do PDF",
            "Czat z ekspertem bez limitu",
        ],
        highlighted: true,
        badge: "3 dni za darmo",
        cta: "Pobierz aplikację",
    },
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <Eyebrow>Plany</Eyebrow>
                    <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-bold mt-5 mb-6 leading-tight">
                        Wybierz plan dopasowany do Ciebie
                    </h1>
                    <p className="text-lg text-text-dark/70 leading-relaxed">
                        Dwa plany, jedna aplikacja. Możesz zmienić lub zmodyfikować swój wybór
                        w każdej chwili.
                    </p>
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
                            {plan.badge && (
                                <span className="absolute -top-3 right-8 bg-accent-pink text-text-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm">
                                    {plan.badge}
                                </span>
                            )}
                            <h2 className={`font-serif text-2xl font-bold mb-1 ${plan.highlighted ? "text-cream" : "text-primary-green"}`}>
                                {plan.name}
                            </h2>
                            <p className={`text-sm mb-6 ${plan.highlighted ? "text-cream/70" : "text-text-dark/60"}`}>
                                {plan.description}
                            </p>
                            <div className="mb-6">
                                <span className="font-serif text-4xl font-bold">{plan.price}</span>
                                <span className={plan.highlighted ? "text-cream/70" : "text-text-dark/50"}>{plan.period}</span>
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
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm text-text-dark/50 italic mt-12">
                    Subskrypcję aktywujesz i zarządzasz nią w aplikacji, po zalogowaniu.
                </p>
            </main>
            <Footer />
        </div>
    );
}
