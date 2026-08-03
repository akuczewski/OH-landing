import type { Metadata } from "next";
import ClaimCodeButtons from "@/components/ClaimCodeButtons";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Odbierz 1 miesiąc za darmo",
    description: "Dołącz do 21-dniowego wyzwania i odbierz miesiąc OH! Club za darmo.",
    robots: { index: false, follow: false },
};

const STEPS = [
    {
        number: "01",
        title: "Wybierz system",
        description: "iOS lub Android.",
    },
    {
        number: "02",
        title: "Odbierz kod i podaj kartę",
        description: "Nie zapłacisz nic przez pierwszy miesiąc.",
    },
    {
        number: "03",
        title: "Pobierz apkę i wpisz kod",
        description: "Bądź gotowy na start wyzwania 10 sierpnia.",
    },
];

export default function Odbierz() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-24 px-6 lg:px-24 max-w-6xl mx-auto min-h-[70vh]">
                <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 mb-20">
                    <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start max-w-xl">
                        <h1 className="font-serif text-4xl md:text-5xl text-primary-green mb-8 leading-tight">
                            Dołącz do 21-dniowego wyzwania i odbierz miesiąc OH! Club za darmo
                        </h1>
                        <p className="text-lg text-text-dark/80 mb-10">
                            Wybierz swój system, odbierz jednorazowy kod i przygotuj się na start.{" "}
                            <strong className="font-bold text-text-dark">Wyzwanie rusza 10 sierpnia.</strong>{" "}
                            <span className="underline underline-offset-2 decoration-2">
                                Liczba kodów jest ograniczona.
                            </span>
                        </p>
                        <ClaimCodeButtons />
                    </div>

                    <div className="flex-1 flex justify-center lg:justify-end w-full">
                        <video
                            className="w-full max-w-[320px] aspect-[9/16] object-cover rounded-[2rem] shadow-card ring-1 ring-black/5"
                            src="/videos/efekty-spacerow.mp4"
                            poster="/videos/odbierz-poster.jpg"
                            controls
                            playsInline
                            preload="metadata"
                        >
                            Twoja przeglądarka nie obsługuje odtwarzania wideo.
                        </video>
                    </div>
                </div>

                <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-primary-green text-center mb-10">
                        Jak to działa
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {STEPS.map((step) => (
                            <div
                                key={step.title}
                                className="bg-white rounded-[1.75rem] shadow-soft ring-1 ring-black/[0.05] p-7 text-center flex flex-col items-center"
                            >
                                <span className="font-serif italic text-5xl text-secondary-green/60 mb-3 leading-none">
                                    {step.number}
                                </span>
                                <p className="font-bold text-text-dark mb-2">{step.title}</p>
                                <p className="text-sm text-text-dark/70 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
