import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

/**
 * Hero kampanii /start — wariant Hero.tsx z kątem "jedzenie / zdrowie hormonalne".
 * Zdjęcie pełnoekranowe + panele z tekstem po lewej (jak na makiecie od marketingu).
 */
export default function CampaignHero() {
    return (
        <section className="relative min-h-[600px] md:min-h-[680px] lg:min-h-[760px] flex items-center overflow-hidden pt-36 pb-16 px-6">
            <img
                src="/start/hero.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Delikatny cień tylko przy lewej krawędzi — dla czytelności paneli
                z tekstem. Zdjęcie zostaje ostre (bez "mgły" na całości). */}
            <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-cream/45 to-transparent" />

            <div className="relative max-w-7xl mx-auto w-full">
                <div className="max-w-xl enter">
                    <Eyebrow>Dostępne na iOS i Androida</Eyebrow>

                    <h1
                        className="enter font-serif text-[2rem] sm:text-4xl lg:text-[3.25rem] text-primary-green leading-[1.14] tracking-tight mt-6 mb-5 bg-light-cream/85 backdrop-blur-sm rounded-[1.5rem] px-6 py-5"
                        style={{ "--enter-delay": "120ms" } as React.CSSProperties}
                    >
                        Jedzenie, które wspiera Twoją drogę do zdrowszych hormonów
                    </h1>

                    <p
                        className="enter text-base md:text-lg text-text-dark/80 leading-relaxed mb-8 bg-light-cream/85 backdrop-blur-sm rounded-[1.5rem] px-6 py-5"
                        style={{ "--enter-delay": "220ms" } as React.CSSProperties}
                    >
                        Autorskie przepisy i gotowe jadłospisy opracowane przez dietetyczkę
                        kliniczną. Stworzone tak, aby wspierać stabilny poziom energii, zdrowie
                        hormonalne i dobrą relację z jedzeniem w sposób, który pasuje do
                        codziennego życia i zostaje z Tobą na dłużej.
                    </p>

                    <div
                        className="enter"
                        style={{ "--enter-delay": "320ms" } as React.CSSProperties}
                    >
                        <Link
                            href="/pobierz"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold bg-primary-green text-light-cream shadow-soft hover:bg-secondary-green hover:shadow-card transition-all duration-300 active:scale-[0.98]"
                        >
                            Dołącz do apki
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
