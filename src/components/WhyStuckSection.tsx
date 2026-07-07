import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const factors = [
    "sposób odżywiania",
    "sen i regeneracja",
    "poziom stresu",
    "aktywność fizyczna",
    "rytm dnia",
    "cykl menstruacyjny",
];

export default function WhyStuckSection() {
    return (
        <section className="relative py-28 px-6 bg-light-cream overflow-hidden">
            <span className="thread-dot hidden lg:block" style={{ top: "3.5rem" }} aria-hidden="true" />

            <div className="max-w-5xl mx-auto lg:pl-16">
                <Reveal>
                    <Eyebrow>Zanim spróbujesz kolejnej rzeczy</Eyebrow>
                    <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold mt-5 mb-6 leading-[1.15] tracking-tight max-w-2xl">
                        Dlaczego chwilowe efekty tak często znikają?
                    </h2>
                    <p className="text-lg text-text-dark/70 max-w-2xl leading-relaxed mb-14">
                        Suplement, nowa dieta, kolejny krem — bywa chwilowa poprawa, a po pewnym czasie
                        wszystko wraca. Najczęściej dlatego, że skupiamy się na pojedynczych objawach,
                        zamiast spojrzeć na organizm jak na cały, powiązany ze sobą system.
                    </p>
                </Reveal>

                <Reveal delayMs={120}>
                    <p className="font-serif text-2xl text-primary-green italic mb-8">
                        Twoje samopoczucie zależy jednocześnie od:
                    </p>
                </Reveal>

                <Reveal delayMs={200}>
                    <div className="flex flex-wrap gap-3 mb-16">
                        {factors.map((factor) => (
                            <span
                                key={factor}
                                className="bg-white px-5 py-3 rounded-full text-text-dark/80 font-semibold shadow-sm ring-1 ring-black/[0.03] hover:ring-secondary-green/40 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {factor}
                            </span>
                        ))}
                    </div>
                </Reveal>

                <Reveal delayMs={260}>
                    <p className="max-w-xl text-lg text-text-dark/70 leading-relaxed border-l-2 border-secondary-green/30 pl-6">
                        Dopiero kiedy zaczynamy patrzeć na organizm całościowo — i dopasowujemy nawyki
                        do rytmu własnego cyklu — pojawia się trwalsza zmiana.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
