import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Cennik",
    description: "Poznaj plany OH! Club i wybierz ten, który najlepiej dopasuje się do Twojego cyklu.",
};

export default function Pricing() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Cennik</h1>
                <p className="text-lg text-text-dark/80 mb-12">Wybierz plan idealny dla Ciebie i zacznij dbać o siebie w rytmie swojego cyklu.</p>
                <div className="bg-white p-12 rounded-[2.5rem] shadow-card text-center max-w-xl mx-auto border-2 border-primary-green/20">
                    <h2 className="text-2xl font-bold mb-4">Wkrótce...</h2>
                    <p>Pracujemy nad przygotowaniem najlepszej oferty.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
