import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
    title: "Dla mediów",
    description: "Informacje prasowe, assety wizualne i pakiety informacyjne dla dziennikarzy i twórców.",
};

export default function Press() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Dla mediów</h1>
                <p className="text-lg text-text-dark/80 mb-12">Informacje prasowe, assety wizualne i pakiety informacyjne dla dziennikarzy i twórców.</p>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-secondary-green/20 max-w-2xl">
                    <h2 className="text-2xl font-serif text-primary-green mb-4">Materiały prasowe (wkrótce)</h2>
                    <p className="text-text-dark/70 mb-6">Pracujemy nad przygotowaniem dedykowanego pakietu dla mediów zawierającego logotypy, makiety aplikacji i wysokiej jakości grafiki.</p>
                    <p className="font-bold">Wycinki prasowe i pytania prosimy kierować na: {SITE.mediaEmail}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
