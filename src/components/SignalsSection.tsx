import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

const signals = [
    "nieregularny lub bolesny cykl",
    "nasilony PMS: rozdrażnienie, spadki nastroju",
    "gorsza kondycja skóry",
    "wypadanie lub przerzedzanie włosów",
    "przewlekłe zmęczenie i brak energii",
    "ochota na słodycze i wahania energii w ciągu dnia",
    "wzdęcia i zatrzymywanie wody",
    "problemy ze snem",
    "uczucie „rozregulowania” organizmu",
];

export default function SignalsSection() {
    return (
        <section className="relative py-28 px-6 bg-cream">
            <span className="thread-dot hidden lg:block" style={{ top: "5rem" }} aria-hidden="true" />

            <div className="max-w-6xl mx-auto lg:pl-16 grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20">
                <Reveal>
                    <div className="lg:sticky lg:top-32">
                        <Eyebrow>Czy to o Tobie?</Eyebrow>
                        <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold mt-5 mb-6 leading-[1.15] tracking-tight">
                            Wiele kobiet latami żyje z sygnałami, które wydają się{" "}
                            <span className="text-secondary-green italic">„normalne”</span>
                        </h2>
                        <p className="text-lg text-text-dark/70 leading-relaxed">
                            Zmęczenie, wahania nastroju czy nieregularny cykl często traktujemy jako
                            coś, z czym po prostu trzeba się pogodzić. Tymczasem bywają to sygnały, że
                            warto dać swojemu organizmowi trochę więcej wsparcia.
                        </p>
                    </div>
                </Reveal>

                <Reveal delayMs={140}>
                    <div className="bg-white rounded-[2rem] shadow-card p-8 md:p-10 ring-1 ring-black/[0.03]">
                        <ul className="space-y-4">
                            {signals.map((signal) => (
                                <li key={signal} className="flex items-start gap-4">
                                    <span className="font-serif text-xl text-accent-pink shrink-0 leading-none -mt-0.5" aria-hidden="true">
                                        —
                                    </span>
                                    <span className="text-text-dark/80 leading-relaxed">{signal}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 pt-6 border-t border-secondary-green/15 text-sm text-text-dark/50 italic leading-relaxed">
                            To nie jest diagnoza. Jeśli któryś z tych sygnałów Cię niepokoi,
                            skonsultuj się z lekarzem. OH! Club wspiera zdrowe nawyki i świadomość
                            cyklu, nie zastępuje opieki medycznej.
                        </p>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
