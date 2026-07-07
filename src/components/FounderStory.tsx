import Image from "next/image";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { getCreators } from "@/lib/strapi";

export default async function FounderStory() {
    const creators = await getCreators();
    const klaudia = creators.find((c) => c.name.toLowerCase().includes("klaudia"));

    return (
        <section className="relative py-28 px-6 bg-light-cream">
            <span className="thread-dot hidden lg:block" style={{ top: "3.5rem" }} aria-hidden="true" />

            <div className="max-w-6xl mx-auto lg:pl-16">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-14 lg:gap-20 items-center">
                    <Reveal>
                        <div className="relative w-56 h-64 md:w-64 md:h-72 mx-auto lg:mx-0">
                            <div className="absolute inset-0 rounded-[2.5rem] bg-accent-pink/25 rotate-3" />
                            <div className="absolute inset-0 p-2 rounded-[2.5rem]">
                                <div className="w-full h-full rounded-[2.1rem] overflow-hidden bg-accent-pink/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/50">
                                    {klaudia?.imageUrl ? (
                                        <Image
                                            src={klaudia.imageUrl}
                                            alt={klaudia.name}
                                            width={256}
                                            height={288}
                                            className={`w-full h-full ${klaudia.imageFit === "contain" ? "object-contain" : "object-cover"} ${klaudia.imageAlign === "top" ? "object-top" : "object-center"}`}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="font-serif text-7xl text-primary-green">K</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <div>
                        <Reveal>
                            <Eyebrow>Historia OH! Club</Eyebrow>
                        </Reveal>
                        <Reveal delayMs={100}>
                            <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold mt-5 mb-7 leading-[1.15] tracking-tight">
                                Ja też kiedyś czułam się zagubiona.
                            </h2>
                        </Reveal>
                        <Reveal delayMs={180}>
                            <div className="space-y-5 text-lg text-text-dark/80 leading-relaxed border-l-2 border-secondary-green/30 pl-6">
                                <p>
                                    Przez lata zmagałam się z zaburzeniami hormonalnymi — półtora roku
                                    bez miesiączki, codzienne zmagania z cerą i poczucie, że mój
                                    organizm działa przeciwko mnie. Wypróbowałam wiele rozwiązań, które
                                    obiecywały szybką poprawę. Zwykle kończyło się to chwilową ulgą albo
                                    kolejnym rozczarowaniem.
                                </p>
                                <p>
                                    W pewnym momencie zrozumiałam, że nie potrzebuję kolejnych
                                    półśrodków ani trików z internetu — potrzebowałam prawdziwego
                                    zrozumienia swojego ciała. Ta droga doprowadziła mnie do stworzenia
                                    przestrzeni, którą dziś rozwijam dla kobiet takich jak Ty.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delayMs={260}>
                            <p className="font-serif text-xl text-primary-green italic mt-6 pl-6">
                                — Klaudia, założycielka OH! Club
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
