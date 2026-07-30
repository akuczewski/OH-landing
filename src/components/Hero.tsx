import Link from "next/link";
import Eyebrow from "./Eyebrow";

export default function Hero() {
    return (
        <section className="relative pt-44 pb-24 px-6 min-h-[92vh] flex items-center overflow-hidden">
            {/* Jedno źródło światła — miękki radialny blask za nagłówkiem, nie zestaw
                przypadkowych, kolorowych plam. */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-full bg-accent-pink/20 blur-[100px]" />
                <div className="absolute bottom-[-25%] right-[-10%] w-[45%] h-[55%] rounded-full bg-secondary-green/15 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
                <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start z-10 max-w-2xl">
                    <div className="enter">
                        <Eyebrow>Dostępne na iOS i Androida</Eyebrow>
                    </div>

                    <h1
                        className="enter font-serif text-4xl md:text-5xl lg:text-6xl mt-6 mb-7 text-primary-green leading-[1.15] tracking-tight"
                        style={{ "--enter-delay": "120ms" } as React.CSSProperties}
                    >
                        Chcesz odzyskać równowagę hormonalną bez zgadywania i rygorystycznych diet?
                    </h1>

                    <p
                        className="enter text-lg md:text-xl text-text-dark/75 max-w-lg mb-10 leading-relaxed"
                        style={{ "--enter-delay": "220ms" } as React.CSSProperties}
                    >
                        Wypełnij krótki quiz, a dopasujemy plan odżywiania do Twoich potrzeb.
                        Aplikacja zajmie się resztą - dostosowując ruch i rytuały pielęgnacyjne do
                        aktualnej fazy Twojego cyklu.
                    </p>

                    <div className="enter w-full flex flex-col items-center lg:items-start gap-3" style={{ "--enter-delay": "320ms" } as React.CSSProperties}>
                        <Link
                            href="/pobierz"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-primary-green text-light-cream shadow-soft hover:bg-secondary-green hover:shadow-card transition-all duration-300 active:scale-[0.98]"
                        >
                            Pobierz aplikację i wypełnij quiz
                        </Link>
                        <p className="text-sm text-text-dark/60">Zajmuje tylko 2 minuty</p>
                    </div>
                </div>

                <div
                    className="enter flex-1 relative w-full max-w-sm lg:max-w-full flex justify-center lg:justify-end z-10"
                    style={{ "--enter-delay": "180ms" } as React.CSSProperties}
                >
                    {/* Doppelbezel — zewnętrzna "obudowa" + wewnętrzny ekran, jak fizyczne,
                        precyzyjnie wykonane urządzenie, nie płaski obrazek w ramce. */}
                    <div className="relative">
                        <div className="p-2.5 rounded-[3.25rem] bg-text-dark/95 shadow-2xl ring-1 ring-black/5">
                            <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[660px] bg-light-cream rounded-[2.75rem] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-text-dark rounded-b-2xl z-20" />
                                <img
                                    src="/screenshots/home.png"
                                    alt="Aplikacja OH! Club - widok główny"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="absolute top-16 -left-8 lg:-left-14 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-card ring-1 ring-black/5 -rotate-3">
                            <p className="text-[10px] uppercase tracking-[0.15em] text-text-dark/40 font-semibold mb-0.5">Aktualna faza</p>
                            <p className="font-serif text-lg text-primary-green font-bold">Folikularna</p>
                        </div>

                        <div className="absolute bottom-20 -right-6 lg:-right-10 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-card ring-1 ring-black/5 rotate-2">
                            <div className="flex items-center gap-2.5">
                                <span className="w-2 h-2 rounded-full bg-secondary-green" />
                                <p className="text-sm font-semibold text-text-dark/70">Plan dnia gotowy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
