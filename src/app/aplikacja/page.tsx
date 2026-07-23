import type { Metadata } from "next";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Aplikacja",
    description: "Zobacz, jak OH! Club dopasowuje dietę, nawyki i rytuały do Twojego celu i rytmu cyklu, oraz jak chronimy Twoją prywatność.",
};

const goals = [
    {
        id: "opanuj-cukier",
        title: "Opanuj cukier",
        description: "Jadłospis o niskim IG i nawyki wspierające stabilną energię w ciągu dnia.",
    },
    {
        id: "opanuj-skore",
        title: "Opanuj skórę",
        description: "Rytuały pielęgnacyjne i dieta dopasowane do potrzeb Twojej cery.",
    },
    {
        id: "opanuj-stres",
        title: "Opanuj stres",
        description: "Krótkie praktyki oddechowe i nawyki budujące spokój na co dzień.",
    },
    {
        id: "glow-up",
        title: "Glow-up",
        description: "Wszystko w jednym miejscu, dla tych, które chcą po prostu poczuć się lepiej.",
    },
];

export default function AplikacjaPage() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32">
                <div className="max-w-4xl mx-auto px-6 text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl text-primary-green leading-tight mb-6">
                        Wypełnij quiz już dziś, a aplikacja dostosuje odpowiedni program do Twoich potrzeb
                    </h1>
                </div>

                <section className="max-w-7xl mx-auto px-6 mb-28">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {goals.map((goal) => (
                            <div key={goal.id} className="bg-white rounded-[2rem] shadow-card p-6 text-center">
                                <h3 className="font-serif text-xl text-primary-green font-bold mb-2">{goal.title}</h3>
                                <p className="text-sm text-text-dark/70 leading-relaxed">{goal.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Features />

                <section className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-primary-green font-bold mb-6">
                        Twoje dane zdrowotne zostają na Twoim telefonie
                    </h2>
                    <p className="text-lg text-text-dark/70 leading-relaxed max-w-2xl mx-auto">
                        Wiek, waga, wzrost i historia cyklu nigdy nie trafiają do naszej chmury.
                        Przechowujemy je wyłącznie lokalnie, na Twoim urządzeniu. Do naszych serwerów
                        wysyłamy jedynie podstawowe informacje potrzebne do działania konta: profil,
                        nawyki i plan diety.
                    </p>
                </section>
            </main>
            <Footer />
        </div>
    );
}
