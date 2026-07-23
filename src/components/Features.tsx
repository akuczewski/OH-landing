const features = [
    {
        id: "cykl",
        title: "Zrozum swój cykl",
        subtitle: "Dostrojone do Twojego rytmu",
        description: "Zapomnij o uniwersalnych planach. OH! Club dynamicznie dostosowuje kaloryczność, intensywność treningów i formę medytacji do Twojej aktualnej fazy cyklu (menstruacyjnej, folikularnej, lutealnej).",
        color: "bg-accent-pink/30",
        image: "/images/aplikacja/cykl.jpg",
        reverse: false,
    },
    {
        id: "rutyny",
        title: "Rytuały pielęgnacyjne na każdy dzień",
        subtitle: "Małe kroki, wielka różnica",
        description: "Dbaj o każdy aspekt siebie za pomocą małych kroków. Wykorzystaj zintegrowany timer do monitorowania swoich nawyków: od snu i nawodnienia, po medytację. Ustawiaj muzykę w tle bez wychodzenia z aplikacji.",
        color: "bg-secondary-green/30",
        image: "/images/aplikacja/rytial.jpeg",
        imagePosition: "object-top",
        reverse: true,
    },
    {
        id: "plany",
        title: "Holistyczne plany diety i treningów",
        subtitle: "Odżywiaj się mądrze, trenuj rozsądnie",
        description: "Przeglądaj autorskie przepisy kulinarne i plany treningowe, tworzone przez ekspertów. Posiłki dopasowane i zbilansowane specjalnie dla poszczególnych faz Twojego cyklu, ułatwią Ci codzienne gotowanie i dbanie o siebie.",
        color: "bg-accent-yellow/40",
        image: "/images/aplikacja/dieta.jpg",
        reverse: false,
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-light-cream relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-primary-green font-bold">
                        Aplikacja zaprojektowana <br className="hidden md:block" />
                        <span className="text-secondary-green italic">z myślą o Tobie</span>
                    </h2>
                    <p className="text-lg md:text-xl text-text-dark/70 max-w-2xl mx-auto font-medium">
                        Porzuć oddzielne aplikacje dla diety, nawyków i medytacji. Miej wszystko przejrzyście ułożone na jednej, estetycznej i przyjemnej w obsłudze platformie.
                    </p>
                </div>

                <div className="flex flex-col gap-32">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
                        >

                            <div className="flex-1 space-y-6">
                                <h4 className="text-sm font-bold tracking-widest uppercase text-text-dark/50">
                                    {feature.subtitle}
                                </h4>
                                <h3 className="font-serif text-4xl md:text-5xl text-primary-green font-bold leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-text-dark/80 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="flex-1 w-full flex justify-center">
                                {/* Mockup Card representing functionality */}
                                <div className={`relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] shadow-card flex items-center justify-center overflow-hidden ${feature.color} border-4 border-light-cream`}>
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className={`w-[90%] h-[90%] object-cover rounded-[1.5rem] shadow-2xl ${feature.imagePosition || 'object-center'}`}
                                    />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
