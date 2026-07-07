import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Opinie użytkowniczek",
    description: "OH! Club jest w fazie beta — sprawdź, co wkrótce powiedzą o nas nasze użytkowniczki.",
};

export default function Testimonials() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Opinie użytkowniczek</h1>
                <p className="text-lg text-text-dark/80 mb-12">OH! Club jest w fazie beta — pierwsze opinie zbieramy właśnie teraz od naszych testerek.</p>
                <div className="bg-white p-12 rounded-[2.5rem] shadow-card text-center max-w-xl mx-auto border-2 border-primary-green/20">
                    <h2 className="text-2xl font-bold mb-4">Opinie wkrótce</h2>
                    <p>Zapisz się na listę oczekujących, a dowiesz się jako jedna z pierwszych, co sądzą o nas nasze użytkowniczki.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
