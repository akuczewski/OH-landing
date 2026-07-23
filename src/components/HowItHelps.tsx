import Link from "next/link";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const pillars = [
    { title: "Wiedza o hormonach", description: "Artykuły i treści tworzone wspólnie z ekspertkami. Zrozum, co dzieje się w Twoim ciele.", span: "lg:col-span-7" },
    { title: "Rytuały dbania o ciało", description: "Małe, codzienne kroki: nawodnienie, sen, pielęgnacja, chwila oddechu.", span: "lg:col-span-5" },
    { title: "Treningi wg cyklu", description: "Aktywność dopasowana do fazy cyklu, bez przetrenowania i bez poczucia winy.", span: "lg:col-span-5" },
    { title: "Nawyki wspierające zdrowie", description: "Prosty, uporządkowany system, a nie kolejna restrykcyjna dieta.", span: "lg:col-span-7" },
];

export default function HowItHelps() {
    return (
        <section className="relative py-28 px-6 bg-cream">
            <span className="thread-dot hidden lg:block" style={{ top: "3.5rem" }} aria-hidden="true" />

            <div className="max-w-6xl mx-auto lg:pl-16">
                <Reveal>
                    <Eyebrow>Dobra wiadomość</Eyebrow>
                    <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold mt-5 mb-6 leading-[1.15] tracking-tight max-w-2xl">
                        Twoje ciało ma ogromną zdolność do{" "}
                        <span className="text-secondary-green italic">odzyskiwania równowagi</span>
                    </h2>
                    <p className="text-lg text-text-dark/70 max-w-2xl leading-relaxed mb-14">
                        Czasami wystarczy kilka dobrze dobranych zmian, aby zobaczyć pierwsze efekty:
                        więcej energii, stabilniejszy nastrój, zdrowszą skórę czy bardziej regularny
                        cykl. Właśnie po to powstał OH! Club.
                    </p>
                </Reveal>

                <div className="grid lg:grid-cols-12 gap-4 mb-14">
                    {pillars.map((pillar, i) => (
                        <Reveal key={pillar.title} delayMs={i * 90} className={pillar.span ?? "lg:col-span-6"}>
                            <div className="h-full p-1.5 rounded-[2rem] bg-white/60 ring-1 ring-black/[0.03]">
                                <div className="h-full bg-white rounded-[1.65rem] p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                                    <h3 className="font-serif text-xl text-primary-green font-bold mb-2">{pillar.title}</h3>
                                    <p className="text-text-dark/70 leading-relaxed">{pillar.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delayMs={360}>
                    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                        <div className="flex flex-col items-start gap-6">
                            <p className="text-sm text-text-dark/50 italic max-w-lg">
                                OH! Club wspiera zdrowe nawyki i świadomość cyklu, nie zastępuje
                                leczenia ani konsultacji lekarskiej.
                            </p>
                            <Link
                                href="/aplikacja"
                                className="group inline-flex items-center gap-3 bg-transparent border-2 border-primary-green/30 text-primary-green pl-8 pr-2 py-2 rounded-full text-lg font-bold hover:border-primary-green transition-all duration-300"
                            >
                                Zobacz, jak działa aplikacja
                                <span className="w-11 h-11 rounded-full bg-primary-green/5 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    ↗
                                </span>
                            </Link>
                        </div>

                        {/* Drugie wystąpienie realnego zrzutu apki — przypomnienie tuż przed
                            CTA, że to działający produkt, nie makieta. */}
                        <div className="shrink-0 p-2 rounded-[1.75rem] bg-text-dark/95 shadow-card rotate-2">
                            <div className="w-32 h-56 rounded-[1.4rem] overflow-hidden">
                                <img
                                    src="/screenshots/nawyki_v2.png"
                                    alt="Zrzut ekranu aplikacji OH! Club, lista nawyków"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
