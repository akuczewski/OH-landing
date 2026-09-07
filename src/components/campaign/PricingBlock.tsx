import Eyebrow from "@/components/Eyebrow";
import PricingCards from "@/components/PricingCards";
import Reveal from "@/components/Reveal";

export default function PricingBlock() {
    return (
        <section className="pt-24 pb-28 px-6 bg-cream">
            <div className="max-w-3xl mx-auto text-center mb-14">
                <Reveal>
                    <p className="font-serif text-2xl md:text-[2rem] text-primary-green font-bold leading-snug mb-10">
                        Twój jadłospis, lista zakupów i pierwsze rekomendacje czekają na Ciebie
                        od razu po dołączeniu. Zacznij dbać o siebie inaczej, już dziś.
                    </p>
                </Reveal>
                <Reveal delayMs={100}>
                    <Eyebrow>Plany</Eyebrow>
                    <h2 className="font-serif text-4xl md:text-5xl text-primary-green font-bold mt-5 mb-6 leading-tight">
                        Wybierz plan dopasowany do Ciebie
                    </h2>
                    <p className="text-lg text-text-dark/70 leading-relaxed">
                        Dwa plany, jedna aplikacja. Możesz zmienić lub zmodyfikować swój wybór
                        w każdej chwili.
                    </p>
                </Reveal>
            </div>

            <PricingCards />
        </section>
    );
}
