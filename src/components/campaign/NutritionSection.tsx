import Reveal from "@/components/Reveal";

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
        <section className="py-24 px-6 bg-light-cream">
            <div className="max-w-7xl mx-auto">
                {/* Intro: nagłówek + akapit */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
                    <Reveal>
                        <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold leading-[1.15] tracking-tight">
                            Wszystko, czego potrzebujesz, by naprawdę zadbać o swoje ciało
                        </h2>
                    </Reveal>
                    <Reveal delayMs={120}>
                        <p className="text-lg text-text-dark/75 leading-relaxed">
                            Większość programów żywieniowych opiera się na zakazach i
                            ograniczeniach. W OH! Club podchodzimy do tego inaczej. Kiedy jesz
                            tak, by wspierać swoje ciało, jego energię, hormony, ruch i
                            regenerację, zaczynasz zauważać prawdziwą różnicę. Bez obsesyjnego
                            liczenia kalorii. Bez wyrzutów sumienia po jedzeniu. Po prostu
                            odżywcze posiłki i zdrowe nawyki, które możesz utrzymać na dłużej.
                        </p>
                    </Reveal>
                </div>

                {/* Stack telefonów + 4 bloki */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <Reveal className="lg:sticky lg:top-28">
                        <div className="relative mx-auto max-w-md lg:max-w-none h-[420px] md:h-[560px]">
                            <img
                                src="/start/phone-1.png"
                                alt="Widok przepisu w aplikacji OH! Club"
                                className="hidden md:block absolute left-0 top-12 w-[52%] rounded-[1.75rem] shadow-2xl ring-1 ring-black/5 -rotate-6"
                            />
                            <img
                                src="/start/phone-2.png"
                                alt="Widok jadłospisu w aplikacji OH! Club"
                                className="absolute left-1/2 -translate-x-1/2 md:left-1/2 top-0 w-[80%] md:w-[54%] rounded-[1.75rem] shadow-2xl ring-1 ring-black/5 z-10"
                            />
                            <img
                                src="/start/phone-3.png"
                                alt="Widok w aplikacji OH! Club"
                                className="hidden md:block absolute right-0 top-12 w-[52%] rounded-[1.75rem] shadow-2xl ring-1 ring-black/5 rotate-6"
                            />
                        </div>
                    </Reveal>

                    <div className="flex flex-col gap-8">
                        {blocks.map((b, i) => (
                            <Reveal key={b.title} delayMs={i * 90}>
                                <div>
                                    <h3 className="font-serif text-xl md:text-2xl text-primary-green font-bold mb-2.5">
                                        {b.title}
                                    </h3>
                                    <p className="text-text-dark/75 leading-relaxed">{b.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
