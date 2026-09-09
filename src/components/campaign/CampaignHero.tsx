import Eyebrow from "@/components/Eyebrow";
import MagneticButton from "@/components/MagneticButton";

/**
 * Hero kampanii /start — wariant Hero.tsx z kątem "jedzenie / zdrowie hormonalne".
 * Zdjęcie pełnoekranowe (Ken Burns + parallax na scroll) + panele z tekstem po lewej.
 */
export default function CampaignHero() {
    return (
        <section className="relative min-h-[600px] md:min-h-[680px] lg:min-h-[760px] flex items-center overflow-hidden pt-36 pb-16 px-6">
            {/* Warstwa tła: parallax (scroll) na wrapperze, Ken Burns (pętla) na zdjęciu.
                Pierwsze dziecko + absolute => maluje się pod resztą bez z-index. */}
            <div className="hero-parallax absolute inset-0 overflow-hidden">
                <img
                    src="/start/hero.jpg"
                    alt=""
                    aria-hidden="true"
                    className="ken-burns absolute inset-0 h-full w-full object-cover"
                />
            </div>
            {/* Delikatny cień tylko przy lewej krawędzi — dla czytelności paneli z tekstem. */}
            <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-cream/45 to-transparent" />

            {/* Ambient — bardzo miękka poświata pod panelami */}
            <div
                aria-hidden="true"
                className="aura -left-24 top-1/3 h-[420px] w-[420px]"
                style={{ background: "radial-gradient(circle, rgba(249,200,217,0.6), transparent 70%)" }}
            />

            <div className="relative max-w-7xl mx-auto w-full">
                <div className="max-w-xl">
                    <div className="enter">
                        <Eyebrow>Dostępne na iOS i Androida</Eyebrow>
                    </div>

                    <h1
                        className="enter-wipe font-serif text-[2rem] sm:text-4xl lg:text-[3.25rem] text-primary-green leading-[1.14] tracking-tight mt-6 mb-5 bg-light-cream/85 backdrop-blur-sm rounded-[1.5rem] px-6 py-5"
                        style={{ "--enter-delay": "120ms" } as React.CSSProperties}
                    >
                        Jedzenie, które wspiera Twoją drogę do zdrowszych hormonów
                    </h1>

                    <p
                        className="enter text-base md:text-lg text-text-dark/80 leading-relaxed mb-8 bg-light-cream/85 backdrop-blur-sm rounded-[1.5rem] px-6 py-5"
                        style={{ "--enter-delay": "260ms" } as React.CSSProperties}
                    >
                        Autorskie przepisy i gotowe jadłospisy opracowane przez dietetyczkę
                        kliniczną. Stworzone tak, aby wspierać stabilny poziom energii, zdrowie
                        hormonalne i dobrą relację z jedzeniem w sposób, który pasuje do
                        codziennego życia i zostaje z Tobą na dłużej.
                    </p>

                    <div className="enter" style={{ "--enter-delay": "400ms" } as React.CSSProperties}>
                        <MagneticButton href="/pobierz">Dołącz do apki</MagneticButton>
                    </div>
                </div>
            </div>

            {/* Wskazówka scrolla */}
            <div
                aria-hidden="true"
                className="enter absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
                style={{ "--enter-delay": "700ms" } as React.CSSProperties}
            >
                <div className="scroll-cue flex h-9 w-6 items-start justify-center rounded-full border border-primary-green/30 pt-2">
                    <span className="h-1.5 w-1 rounded-full bg-primary-green/50" />
                </div>
            </div>
        </section>
    );
}
