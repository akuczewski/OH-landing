import type { Metadata } from "next";
import DownloadButtons from "@/components/DownloadButtons";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Pobierz aplikację",
    description: "OH! Club jest już dostępny w App Store i Google Play. Pobierz i zacznij dbać o siebie w rytmie swojego cyklu.",
};

export default function Download() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh] text-center flex flex-col items-center justify-center">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Pobierz aplikację</h1>
                <p className="text-lg text-text-dark/80 mb-12 max-w-xl">
                    OH! Club jest już dostępny na iOS i Androida. Pobierz i zacznij dbać o siebie
                    w rytmie swojego cyklu.
                </p>
                <DownloadButtons />
            </main>
            <Footer />
        </div>
    );
}
