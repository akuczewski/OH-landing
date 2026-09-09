import Eyebrow from "@/components/Eyebrow";
import ScrollReveal from "@/components/ScrollReveal";

type Path = {
    title: string;
    lead: string;
    bullets: string[];
    cardClass: string;
    titleClass: string;
    textClass: string;
};

const paths: Path[] = [
    {
        title: "Opanuj cukier",
        lead: "Najlepszy wybór, jeśli zależy Ci na stabilniejszej energii, większej kontroli nad apetytem i regularnych posiłkach.",
        bullets: [
            "7-dniowy jadłospis o niskim indeksie glikemicznym",
            "lista zakupów i możliwość wymiany posiłków",
            "codzienne nawyki wspierające stabilną energię",
            "obserwacja apetytu, energii i samopoczucia",
        ],
        cardClass: "bg-accent-pink/50",
        titleClass: "text-primary-green",
        textClass: "text-text-dark/75",
    },
    {
        title: "Opanuj skórę",
        lead: "Dla kobiet, które chcą zadbać o problematyczną cerę szerzej niż tylko za pomocą kolejnego kosmetyku.",
        bullets: [
            "jadłospis opracowany z myślą o potrzebach skóry",
            "rytuały pielęgnacyjne przygotowane z kosmetolożką",
            "obserwacja zmian skóry w kontekście cyklu i codziennych nawyków",
            "rekomendacje dopasowane do aktualnego samopoczucia",
        ],
        cardClass: "bg-accent-yellow/60",
        titleClass: "text-primary-green",
        textClass: "text-text-dark/75",
    },
    {
        title: "Opanuj stres",
        lead: "Dla kobiet, którym brakuje energii, trudno się wyciszyć, a napięcie zaczyna przejmować kontrolę nad całym dniem.",
        bullets: [
            "krótkie praktyki oddechowe",
            "proste rytuały wspierające wyciszenie i regenerację",
            "codzienne nawyki, które nie wymagają życiowej rewolucji",
            "obserwacja energii, nastroju i samopoczucia",
        ],
        cardClass: "bg-secondary-green/60",
        titleClass: "text-primary-green",
        textClass: "text-text-dark/75",
    },
    {
        title: "Glow-up",
        lead: "Dla kobiet, które nie chcą skupiać się na jednym problemie, chcą po prostu lepiej się czuć i kompleksowo o siebie zadbać.",
        bullets: [
            "pełnowartościowy jadłospis i lista zakupów",
            "rekomendowany trening i rytuał pielęgnacyjny",
            "codzienne nawyki wspierające energię i samopoczucie",
            "monitoring postępów, objawów i cyklu",
        ],
        cardClass: "bg-white ring-1 ring-primary-green/20",
        titleClass: "text-primary-green",
        textClass: "text-text-dark/75",
    },
];

export default function PathsSection() {
    return (
        <section className="relative py-24 px-6 bg-cream overflow-hidden">
            <div
                aria-hidden="true"
                className="aura left-[calc(50%-230px)] top-10 h-[460px] w-[460px]"
                style={{ background: "radial-gradient(circle, rgba(249,200,217,0.4), transparent 70%)" }}
            />
            <div className="relative max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
                    <div>
                        <ScrollReveal>
                            <Eyebrow>Cztery ścieżki</Eyebrow>
                        </ScrollReveal>
                        <ScrollReveal variant="wipe" stagger={80}>
                            <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold leading-[1.15] tracking-tight mt-5">
                                Nie musisz wiedzieć, od czego zacząć
                            </h2>
                        </ScrollReveal>
                    </div>
                    <ScrollReveal stagger={120}>
                        <p className="text-lg text-text-dark/75 leading-relaxed lg:pt-10">
                            Najpierw wypełniasz krótki quiz o swoim samopoczuciu, nawykach i
                            aktualnych potrzebach. Na podstawie odpowiedzi OH! Club dobiera dla
                            Ciebie jedną z czterech ścieżek.
                        </p>
                    </ScrollReveal>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {paths.map((p, i) => (
                        <ScrollReveal key={p.title} stagger={i * 90} className="group h-full">
                            {/* Double-bezel: zewnętrzna „tacka" + wewnętrzny kolorowy rdzeń */}
                            <div className="h-full rounded-[1.95rem] bg-white/35 p-1.5 ring-1 ring-black/[0.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
                                <div
                                    className={`h-full rounded-[1.6rem] p-6 shadow-card transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_20px_44px_-14px_rgba(74,66,56,0.24)] ${p.cardClass}`}
                                >
                                    <h3 className={`font-serif text-xl font-bold text-center mb-3 ${p.titleClass}`}>
                                        {p.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed text-center mb-5 ${p.textClass}`}>
                                        {p.lead}
                                    </p>
                                    <ul className="space-y-2.5">
                                        {p.bullets.map((b, bi) => (
                                            <li
                                                key={b}
                                                className={`flex gap-2 text-sm leading-snug transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 ${p.textClass}`}
                                                style={{ transitionDelay: `${bi * 45}ms` }}
                                            >
                                                <span className={`shrink-0 ${p.titleClass}`}>✓</span>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
