import Eyebrow from "./Eyebrow";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

/**
 * Szary pasek CTA tuż nad stopką — ostatnie wezwanie do działania na stronie
 * głównej, zanim strona przechodzi w ciemnozieloną stopkę.
 */
export default function JoinCtaBand() {
    return (
        <section className="py-20 px-6 bg-stone-100">
            <Reveal className="max-w-2xl mx-auto text-center flex flex-col items-center">
                <Eyebrow>Zrób pierwszy krok</Eyebrow>
                <h2 className="font-serif text-3xl md:text-4xl text-primary-green font-bold mt-5 mb-8 leading-[1.15] tracking-tight">
                    Gotowa, by zadbać o siebie inaczej?
                </h2>
                <MagneticButton href="/pobierz">Dołącz do aplikacji</MagneticButton>
            </Reveal>
        </section>
    );
}
