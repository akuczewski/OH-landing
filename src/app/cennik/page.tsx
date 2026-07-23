import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PricingCards from "@/components/PricingCards";

export const metadata: Metadata = {
    title: "Cennik",
    description: "Poznaj plany OH! Club i wybierz ten, który najlepiej dopasuje się do Twojego cyklu.",
};

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

                <PricingCards />
            </main>
            <Footer />
        </div>
    );
}
