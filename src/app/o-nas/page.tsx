import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "O nas",
    description: "OH! Club to projekt tworzony przez kobiety dla kobiet. Poznaj misję i podejście holistyczne stojące za aplikacją.",
};

export default function About() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">O nas</h1>
                <div className="prose prose-lg max-w-3xl text-text-dark/80">
                    <p>
                        OH! Club to projekt tworzony przez kobiety dla kobiet. Naszą misją jest edukacja i dostarczenie narzędzia, które pozwoli zintegrować dbanie o siebie (dietę, trening, pielęgnację) z naturalnym cyklem organizmu.
                    </p>
                    <p className="mt-4">
                        Wierzymy w podejście holistyczne i w to, że każda faza cyklu ma swoje unikalne potrzeby, które warto zrozumieć i wspierać.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
