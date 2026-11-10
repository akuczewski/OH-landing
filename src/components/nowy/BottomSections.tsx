import Image from "next/image";
import Link from "next/link";
import { Accent, CtaLink, Pill } from "./ui";

const QUOTES = [
    "Wróciła mi energia, a dni okresu przestały być męką. Mogę normalnie funkcjonować.",
    "Dieta stała się kolorowa i różnorodna, przestałam mieć ochotę na słodkie, a skóra i samopoczucie wyraźnie się poprawiły.",
    "Podchodzi do tematu holistycznie i bardzo indywidualnie, czułam się wysłuchana na każdym etapie.",
];

export function TestimonialsSection() {
    return (
        <section className="bg-light-cream pt-4 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 data-reveal className="font-serif font-bold text-3xl md:text-[2.6rem] leading-tight tracking-tight text-primary-green">
                    Co mówią kobiety, które z nami <Accent>pracowały</Accent>
                </h2>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    {QUOTES.map((q) => (
                        <figure data-reveal key={q} className="rounded-[1.75rem] bg-white p-7">
                            <span className="font-serif text-5xl leading-none text-accent-pink" aria-hidden="true">“</span>
                            <blockquote className="italic text-text-dark/85 leading-relaxed mt-1">{q}”</blockquote>
                            <figcaption className="text-xs text-text-dark/50 mt-4">opinia o współpracy z Klaudią</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FounderSection({ photo }: { photo: string }) {
    return (
        <section className="bg-light-cream pb-20 lg:pb-24 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center">
                <div data-reveal className="relative w-full max-w-sm mx-auto lg:mx-0">
                    <div className="absolute -left-4 -top-4 w-full h-full rounded-[2.5rem] bg-accent-pink" aria-hidden="true" />
                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
                        <Image src={photo} alt="Klaudia Kubrak, założycielka OH! Club" fill sizes="(min-width: 1024px) 24rem, 90vw" className="object-cover object-top" />
                    </div>
                </div>
                <div data-reveal>
                    <Pill>Historia założycielki</Pill>
                    <h2 className="font-serif font-bold text-3xl md:text-[2.6rem] leading-tight tracking-tight text-primary-green mt-5">
                        Ja też kiedyś czułam się <Accent>zagubiona</Accent>
                    </h2>
                    <p className="text-lg text-text-dark/75 leading-relaxed mt-5 max-w-xl">
                        Przez lata zmagałam się z zaburzeniami hormonalnymi: półtora roku bez miesiączki, insulinooporność,
                        hiperandrogenizm i codzienna walka z cerą. Zrozumiałam, że nie potrzebuję kolejnych półśrodków, tylko
                        prawdziwego zrozumienia swojego ciała.
                    </p>
                    <p className="font-serif font-bold text-2xl text-primary-green mt-6">
                        Tak powstał <Accent>OH! Club.</Accent>
                    </p>
                    <p className="text-sm text-text-dark/60 mt-2">Klaudia, dietetyk kliniczny i założycielka</p>
                </div>
            </div>
        </section>
    );
}

export type ExpertCard = { name: string; role: string; photo: string | null; fit: "cover" | "contain"; align: "top" | "center" };

export function ExpertsSection({ experts }: { experts: ExpertCard[] }) {
    if (experts.length === 0) return null;
    return (
        <section className="bg-light-cream pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 data-reveal className="font-serif font-bold text-3xl md:text-[2.6rem] leading-tight tracking-tight text-primary-green">
                    Poznaj ekspertów <Accent>OH! Club</Accent>
                </h2>
                <p className="text-text-dark/70 mt-2">Za planami, treningami, przepisami i rytuałami stoi zespół doświadczonych specjalistów.</p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                    {experts.map((e) => (
                        <li data-reveal key={e.name} className="group rounded-[1.5rem] bg-white overflow-hidden">
                            <div className="relative aspect-[4/5] bg-accent-pink/30">
                                {e.photo ? (
                                    <Image src={e.photo} alt={e.name} fill sizes="(min-width: 1024px) 18rem, 45vw" className={`${e.fit === "contain" ? "object-contain" : "object-cover"} ${e.align === "top" ? "object-top" : "object-center"} transition-transform duration-700 ease-out group-hover:scale-105`} />
                                ) : (
                                    <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl text-primary-green">{e.name[0]}</span>
                                )}
                            </div>
                            <div className="px-3.5 py-3">
                                <p className="font-bold text-sm text-text-dark">{e.name}</p>
                                <p className="text-xs text-text-dark/60 leading-snug mt-0.5">{e.role}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <Link href="/tworcy" className="inline-block mt-6 font-bold text-primary-green hover:underline underline-offset-4">Zobacz wszystkich twórców →</Link>
            </div>
        </section>
    );
}

const FAQ: { q: string; a: React.ReactNode }[] = [
    { q: "Czym jest OH! Club?", a: "Aplikacją, która łączy cykl, dietę, ruch i pielęgnację w jednym miejscu i dopasowuje je do fazy cyklu." },
    { q: "Jak działa quiz?", a: "Zajmuje około 2 minut. Na jego podstawie aplikacja dopasowuje program i plan odżywiania do Twoich potrzeb." },
    { q: "Czy mogę zmieniać posiłki w jadłospisie?", a: "Tak, posiłki możesz wymieniać i edytować, a w Preferencjach ustawisz liczbę posiłków i cel kalorii." },
    { q: "Czym różni się OH! Club od OH! Club Care?", a: "OH! Club to aplikacja z planem, treściami i dziennikiem. Care dodaje kontakt z ekspertem i 30% zniżki na konsultacje." },
    { q: "Czy aplikacja zastępuje lekarza?", a: "Nie. OH! Club wspiera zdrowe nawyki i świadomość cyklu, nie zastępuje leczenia ani konsultacji lekarskiej." },
    {
        q: "Czy działa przy nieregularnym cyklu, PCOS lub antykoncepcji?",
        a: "Fazy wyznaczamy na podstawie długości cyklu i daty ostatniej miesiączki. Gdy cykl jest nieregularny, zaznaczasz w aplikacji początek miesiączki, a fazy przeliczają się od nowa. [UZUPEŁNIJ: jak traktujemy antykoncepcję hormonalną]",
    },
    { q: "Jak działa 7 dni za darmo?", a: "Subskrypcję zakładasz w App Store lub Google Play, a pierwsze 7 dni jest bezpłatne. Jeśli anulujesz przed końcem okresu próbnego, nic nie zapłacisz. Potem subskrypcja odnawia się automatycznie." },
    { q: "Jak zrezygnować lub zmienić plan?", a: "W każdej chwili w ustawieniach subskrypcji App Store lub Google Play. Do zarządzania subskrypcją przejdziesz też z aplikacji: Profil, Twój plan." },
    {
        q: "Co dzieje się z moimi danymi?",
        a: (
            <>
                Dane zdrowotne, takie jak cykl, objawy i dziennik, zostają na Twoim telefonie. Szczegóły znajdziesz w{" "}
                <Link href="/polityka-prywatnosci" className="underline underline-offset-2">polityce prywatności</Link>.
            </>
        ),
    },
];

export function FaqSection() {
    const half = Math.ceil(FAQ.length / 2);
    const col = (items: typeof FAQ) => (
        <div className="space-y-3">
            {items.map((f) => (
                <details data-reveal key={f.q} className="group rounded-3xl bg-white px-6 py-4">
                    <summary className="cursor-pointer list-none font-bold text-text-dark flex items-start gap-2">
                        <span className="text-xs mt-1.5 transition-transform group-open:rotate-90" aria-hidden="true">▶</span>
                        {f.q}
                    </summary>
                    <p className="text-text-dark/75 leading-relaxed mt-3 pl-5">{f.a}</p>
                </details>
            ))}
        </div>
    );
    return (
        <section className="bg-light-cream pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 data-reveal className="font-serif font-bold text-3xl md:text-[2.6rem] leading-tight tracking-tight text-primary-green">
                    Najczęstsze <Accent>pytania</Accent>
                </h2>
                <div className="grid md:grid-cols-2 gap-3 mt-8 items-start">
                    {col(FAQ.slice(0, half))}
                    {col(FAQ.slice(half))}
                </div>
            </div>
        </section>
    );
}

export function ClosingSection({ klaudiaPhoto }: { klaudiaPhoto: string }) {
    return (
        <section className="bg-light-cream pb-10 px-6">
            <div className="max-w-6xl mx-auto">
                <div data-reveal className="rounded-[2rem] bg-primary-green px-6 py-14 text-center">
                    <h2 className="font-serif font-bold text-3xl md:text-[2.75rem] leading-tight text-cream">
                        Gotowa, by zadbać o siebie <Accent tone="pink">inaczej</Accent>?
                    </h2>
                    <div className="mt-7">
                        <CtaLink />
                    </div>
                </div>

                <div data-reveal className="mt-6 rounded-[2rem] bg-white p-6 md:p-7 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative w-20 h-24 shrink-0 rounded-2xl overflow-hidden bg-accent-pink/30">
                        <Image src={klaudiaPhoto} alt="Okładka ebooka Badania hormonalne" fill sizes="80px" className="object-cover object-top" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="font-serif font-bold text-2xl text-primary-green">
                            Darmowy ebook: <Accent>Badania hormonalne</Accent>
                        </h3>
                        <p className="text-text-dark/70 mt-1">
                            Co zbadać i jak przygotować się do diagnostyki. Masz już wyniki? Omów je ze specjalistką z OH! Club Care.
                        </p>
                    </div>
                    <a href="/lista-badan-hormonalnych.pdf" target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent-pink px-7 py-3 font-bold text-text-dark hover:brightness-95 transition">
                        Pobierz
                    </a>
                </div>

                <p className="text-center text-sm text-text-dark/60 mt-8">
                    OH! Club wspiera zdrowe nawyki i świadomość cyklu, nie zastępuje opieki medycznej.
                </p>
            </div>
        </section>
    );
}
