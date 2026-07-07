import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
    title: "Pobierz aplikację",
    description: "OH! Club wkrótce w App Store i Google Play — zapisz się na listę oczekujących, żeby dowiedzieć się pierwsza.",
};

export default function Download() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh] text-center flex flex-col items-center justify-center">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Pobierz aplikację</h1>
                <p className="text-lg text-text-dark/80 mb-4 max-w-xl">OH! Club jest jeszcze w przygotowaniu — App Store i Google Play wkrótce.</p>
                <p className="text-lg text-text-dark/80 mb-12 max-w-xl">Zostaw e-mail, a powiadomimy Cię w dniu premiery.</p>
                <WaitlistForm className="w-full max-w-xl" />
            </main>
            <Footer />
        </div>
    );
}
