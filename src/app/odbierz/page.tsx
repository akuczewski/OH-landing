import type { Metadata } from "next";
import ClaimCodeButtons from "@/components/ClaimCodeButtons";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Odbierz 1 miesiąc za darmo",
    description: "Odbierz swój kod promocyjny i korzystaj z OH! Club przez miesiąc bez opłat.",
    robots: { index: false, follow: false },
};

export default function Odbierz() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh] text-center flex flex-col items-center justify-center">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Odbierz 1 miesiąc za darmo</h1>
                <p className="text-lg text-text-dark/80 mb-12 max-w-xl">
                    Wybierz swój system, a otrzymasz jednorazowy kod promocyjny na miesiąc korzystania
                    z OH! Club bez opłat. Kodów jest ograniczona liczba.
                </p>
                <ClaimCodeButtons />
            </main>
            <Footer />
        </div>
    );
}
