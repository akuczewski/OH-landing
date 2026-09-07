import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";

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
        <section className="py-24 px-6 bg-cream">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
                    <Reveal>
                        <Eyebrow>Cztery ścieżki</Eyebrow>
                        <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold leading-[1.15] tracking-tight mt-5">
                            Nie musisz wiedzieć, od czego zacząć
                        </h2>
                    </Reveal>
                    <Reveal delayMs={120}>
                        <p className="text-lg text-text-dark/75 leading-relaxed lg:pt-10">
                            Najpierw wypełniasz krótki quiz o swoim samopoczuciu, nawykach i
                            aktualnych potrzebach. Na podstawie odpowiedzi OH! Club dobiera dla
                            Ciebie jedną z czterech ścieżek.
                        </p>
                    </Reveal>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {paths.map((p, i) => (
                        <Reveal key={p.title} delayMs={i * 90}>
                            <div className={`h-full rounded-[1.75rem] p-6 shadow-card ${p.cardClass}`}>
                                <h3 className={`font-serif text-xl font-bold text-center mb-3 ${p.titleClass}`}>
                                    {p.title}
                                </h3>
                                <p className={`text-sm leading-relaxed text-center mb-5 ${p.textClass}`}>
                                    {p.lead}
                                </p>
                                <ul className="space-y-2.5">
                                    {p.bullets.map((b) => (
                                        <li key={b} className={`flex gap-2 text-sm leading-snug ${p.textClass}`}>
                                            <span className={`shrink-0 ${p.titleClass}`}>✓</span>
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
