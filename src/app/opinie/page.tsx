import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Opinie użytkowniczek",
    description: "Sprawdź, co mówią o OH! Club kobiety, które z nami pracowały.",
};

export default function Testimonials() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Opinie użytkowniczek</h1>
                <p className="text-lg text-text-dark/80 mb-12">OH! Club jest już dostępny na iOS i Androida, zbieramy pierwsze opinie od użytkowniczek.</p>
                <div className="bg-white p-12 rounded-[2.5rem] shadow-card text-center max-w-xl mx-auto border-2 border-primary-green/20">
                    <h2 className="text-2xl font-bold mb-4">Więcej opinii wkrótce</h2>
                    <p>Zobacz, co dziś mówią o nas kobiety, które współpracowały z Klaudią, na stronie głównej.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
