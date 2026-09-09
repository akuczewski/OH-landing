import ScrollReveal from "@/components/ScrollReveal";

const blocks = [
    {
        title: "Odżywianie z myślą o zdrowiu hormonalnym",
        body: "Potrzeby kobiecego organizmu nie są każdego dnia takie same. Zmieniają się wraz z cyklem, poziomem stresu, aktywnością i aktualnym samopoczuciem. Dlatego plany OH! Club uwzględniają ten szerszy obraz, zamiast próbować dopasować każdą kobietę do jednego, uniwersalnego schematu.",
    },
    {
        title: "Gotowe jadłospisy, mniej codziennych decyzji",
        body: "Koniec z codziennym zastanawianiem się: „co mam dzisiaj zjeść?”. W OH! Club otrzymujesz uporządkowany jadłospis dopasowany do Twoich potrzeb i celu. Ty wybierasz posiłki, na które masz ochotę. Aplikacja pomaga Ci zaplanować resztę, bez chaosu, przypadkowych przepisów i zaczynania każdego dnia od zera.",
    },
    {
        title: "Autorskie przepisy dietetyczki",
        body: "Każdy przepis w OH! Club został opracowany przez dietetyczkę kliniczną z myślą o odpowiednich proporcjach makroskładników: białku wspierającym regenerację, węglowodanach złożonych zapewniających stabilną energię i zdrowych tłuszczach ważnych dla kobiecego organizmu. Pełnowartościowo, prosto i co równie ważne bardzo smacznie.",
    },
    {
        title: "Jedzenie i ruch w jednym planie",
        body: "Nie potrzebujesz osobnej aplikacji do jadłospisu, kolejnej do treningów i jeszcze jednej do śledzenia cyklu. W OH! Club jedzenie, aktywność i regeneracja tworzą jeden spójny plan dopasowany do Twojego celu, cyklu oraz tego, jak czujesz się danego dnia.",
    },
];

export default function NutritionSection() {
    return (
        <section className="relative py-24 px-6 bg-light-cream overflow-hidden">
            <div
                aria-hidden="true"
                className="aura right-[-6rem] top-24 h-[520px] w-[520px]"
                style={{ background: "radial-gradient(circle, rgba(152,166,108,0.35), transparent 70%)" }}
            />
            <div className="relative max-w-7xl mx-auto">
                {/* Intro: nagłówek + akapit */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
                    <ScrollReveal variant="wipe">
                        <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold leading-[1.15] tracking-tight">
                            Wszystko, czego potrzebujesz, by naprawdę zadbać o swoje ciało
                        </h2>
                    </ScrollReveal>
                    <ScrollReveal stagger={120}>
                        <p className="text-lg text-text-dark/75 leading-relaxed">
                            Większość programów żywieniowych opiera się na zakazach i
                            ograniczeniach. W OH! Club podchodzimy do tego inaczej. Kiedy jesz
                            tak, by wspierać swoje ciało, jego energię, hormony, ruch i
                            regenerację, zaczynasz zauważać prawdziwą różnicę. Bez obsesyjnego
                            liczenia kalorii. Bez wyrzutów sumienia po jedzeniu. Po prostu
                            odżywcze posiłki i zdrowe nawyki, które możesz utrzymać na dłużej.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Stack telefonów + 4 bloki */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <ScrollReveal className="lg:sticky lg:top-28">
                        {/* mobile: pojedynczy telefon w normalnym flow */}
                        <img
                            src="/start/phone-2.png"
                            alt="Widok jadłospisu w aplikacji OH! Club"
                            className="float-y md:hidden mx-auto w-[68%] max-w-[280px] rounded-[1.75rem] shadow-2xl ring-1 ring-black/5"
                        />
                        {/* md+: stack trzech telefonów pod kątem, z delikatnym floatem.
                            Wrapper trzyma pozycję i obrót; float (transform: translateY)
                            żyje na <img> w środku, żeby nie kasować rotacji/centrowania. */}
                        <div className="hidden md:block relative mx-auto max-w-md lg:max-w-none h-[560px]">
                            <div className="absolute left-0 top-12 w-[52%] -rotate-6">
                                <img
                                    src="/start/phone-1.png"
                                    alt="Widok przepisu w aplikacji OH! Club"
                                    className="float-y w-full rounded-[1.75rem] shadow-2xl ring-1 ring-black/5"
                                    style={{ "--float-delay": "0ms" } as React.CSSProperties}
                                />
                            </div>
                            <div className="absolute left-1/2 top-0 z-10 w-[54%] -translate-x-1/2">
                                <img
                                    src="/start/phone-2.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="float-y w-full rounded-[1.75rem] shadow-2xl ring-1 ring-black/5"
                                    style={{ "--float-delay": "-2s" } as React.CSSProperties}
                                />
                            </div>
                            <div className="absolute right-0 top-12 w-[52%] rotate-6">
                                <img
                                    src="/start/phone-3.png"
                                    alt="Widok w aplikacji OH! Club"
                                    className="float-y w-full rounded-[1.75rem] shadow-2xl ring-1 ring-black/5"
                                    style={{ "--float-delay": "-4s" } as React.CSSProperties}
                                />
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="flex flex-col gap-8">
                        {blocks.map((b, i) => (
                            <ScrollReveal key={b.title} stagger={i * 90}>
                                <div>
                                    <h3 className="font-serif text-xl md:text-2xl text-primary-green font-bold mb-2.5">
                                        {b.title}
                                    </h3>
                                    <p className="text-text-dark/75 leading-relaxed">{b.body}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
