import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import StoreBadges from "@/components/StoreBadges";
import { getCreators } from "@/lib/strapi";

export const metadata: Metadata = {
    title: "Pobierz aplikację",
    description:
        "Pobierz OH! Club na iOS lub Androida. Wypełnij 2-minutowy quiz, a aplikacja dopasuje jadłospis, nawyki i trening do Twojego cyklu.",
};

const PROGRAMS = ["Opanuj cukier", "Opanuj skórę", "Opanuj stres", "Glow up"];
const STEPS = ["Pobierz aplikację", "Wypełnij quiz", "Odbierz swój plan"];

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

/** Telefon z realnym screenem; dolna część ekranu wygasza się w tło jak na makiecie. */
function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`p-2 rounded-[2.6rem] bg-text-dark shadow-2xl ring-1 ring-black/5 ${className}`}>
            <div className="relative w-[200px] h-[420px] md:w-[240px] md:h-[500px] rounded-[2.2rem] overflow-hidden bg-light-cream">
                <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent via-light-cream/70 to-light-cream backdrop-blur-[1px]" />
            </div>
        </div>
    );
}

function Flower({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
            {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cx="20" cy="10" rx="7" ry="9" fill="#F4A9C4" transform={`rotate(${r} 20 20)`} />
            ))}
            <circle cx="20" cy="20" r="5" fill="#F1E6A8" />
        </svg>
    );
}

function Arrow() {
    return (
        <svg viewBox="0 0 24 24" className="hidden md:block w-5 h-5 text-cream/70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export default async function Download() {
    const creators = await getCreators();
    const klaudia = creators.find((c) => c.name.toLowerCase().includes("klaudia"));

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main>
                <section className="pt-32 lg:pt-36 pb-16 lg:pb-20 px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-14 lg:gap-10 items-center">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <span className="enter inline-flex rounded-full bg-accent-pink/50 px-4 py-1.5 text-sm font-semibold text-primary-green">
                                Dostępne na iOS i Androida · wypróbuj za darmo
                            </span>

                            <h1
                                className="enter font-serif font-bold text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.08] tracking-tight text-primary-green mt-7"
                                style={delay(100)}
                            >
                                Pobierz OH! Club i dbaj o siebie{" "}
                                <em className="text-secondary-green">w rytmie swoich hormonów</em>
                            </h1>

                            <p className="enter text-lg text-text-dark/75 leading-relaxed max-w-xl mt-7" style={delay(180)}>
                                Wypełnij 2-minutowy quiz, a aplikacja dopasuje jadłospis i nawyki do Twoich
                                potrzeb oraz trening do Twojego cyklu.
                            </p>

                            <div className="enter mt-9" style={delay(260)}>
                                <StoreBadges />
                            </div>

                            {/* QR tylko na komputerze — na telefonie i tak klika się przyciski wyżej. */}
                            <div className="enter hidden lg:flex items-center gap-5 mt-8" style={delay(320)}>
                                <div className="rounded-2xl border-2 border-dashed border-text-dark/20 bg-white p-2.5">
                                    <img src="/pobierz/qr.svg" alt="Kod QR do pobrania aplikacji OH! Club" width={92} height={92} />
                                </div>
                                <p className="text-text-dark/70 max-w-[13rem] leading-snug">
                                    Na komputerze? Zeskanuj kod telefonem.
                                </p>
                            </div>

                            <div className="enter mt-10" style={delay(380)}>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-dark/60">Programy w aplikacji</p>
                                <ul className="flex flex-wrap justify-center lg:justify-start gap-2.5 mt-3.5">
                                    {PROGRAMS.map((p) => (
                                        <li key={p} className="rounded-full bg-accent-pink/50 px-4 py-2 text-sm font-semibold text-primary-green">
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="enter relative w-full max-w-[34rem] mx-auto h-[540px] md:h-[620px]" style={delay(160)}>
                            <div className="absolute right-[4%] top-[8%] w-[78%] aspect-square rounded-full bg-accent-pink/45" aria-hidden="true" />
                            <Flower className="absolute right-0 top-0 w-12 h-12 md:w-14 md:h-14" />

                            <Phone src="/start/phone-2.png" alt="Jadłospis w aplikacji OH! Club" className="absolute left-0 md:left-[4%] top-0 -rotate-2" />
                            <Phone src="/screenshots/nawyki_v2.png" alt="Nawyki w aplikacji OH! Club" className="absolute right-0 top-[14%] rotate-1" />

                            <div className="absolute left-0 md:left-[-2%] bottom-[16%] md:bottom-[18%] rounded-full bg-white px-5 py-3 shadow-card ring-1 ring-black/5 font-bold text-primary-green">
                                ✓ Quiz: 2 minuty
                            </div>

                            <div className="absolute right-0 bottom-0 flex items-center gap-3.5 rounded-3xl bg-white pl-3 pr-5 py-3 shadow-card ring-1 ring-black/5 max-w-[17rem]">
                                <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden bg-accent-pink/40">
                                    {klaudia?.imageUrl ? (
                                        <Image src={klaudia.imageUrl} alt="Klaudia Kubrak" width={96} height={96} className="w-full h-full object-cover object-top" />
                                    ) : (
                                        <span className="w-full h-full flex items-center justify-center font-serif text-xl text-primary-green">K</span>
                                    )}
                                </div>
                                <p className="text-sm leading-snug text-text-dark/80">
                                    Stworzone przez dietetyk kliniczną <strong className="text-text-dark">Klaudię Kubrak</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-primary-green px-6 py-9">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-cream">Jak zacząć?</h2>
                        <ol className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                            {STEPS.map((step, i) => (
                                <li key={step} className="flex items-center gap-4 md:gap-8">
                                    <span className="flex items-center gap-3">
                                        <span className="w-9 h-9 shrink-0 rounded-full bg-accent-pink text-primary-green font-bold flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                        <span className="font-bold text-cream text-lg">{step}</span>
                                    </span>
                                    {i < STEPS.length - 1 && <Arrow />}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <p className="px-6 pt-6 text-center text-sm text-text-dark/60">
                    OH! Club wspiera zdrowe nawyki i świadomość cyklu, nie zastępuje opieki medycznej.
                </p>
            </main>
            <Footer />
        </div>
    );
}
