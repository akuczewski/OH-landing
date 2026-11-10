import Image from "next/image";
import Link from "next/link";
import { Accent, CheckIcon, CtaLink, Phone, Pill } from "./ui";

const PROGRAMS = [
    { name: "Opanuj skórę", sub: "cera, jelita, androgeny" },
    { name: "Opanuj cukier", sub: "insulina i stabilna energia" },
    { name: "Opanuj stres", sub: "kortyzol i spokój" },
    { name: "Glow up", sub: "energia i blask" },
];

export function InsideSection() {
    return (
        <section className="py-20 lg:py-24 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <Pill>Zajrzyj do środka</Pill>
                    <h2 className="font-serif font-bold text-3xl md:text-[2.75rem] leading-tight tracking-tight text-primary-green mt-5">
                        Plan dopasowany do Twojego <Accent>programu i cyklu</Accent>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mt-14">
                    <div>
                        <h3 className="font-serif font-bold text-2xl md:text-3xl leading-snug text-primary-green">
                            Jadłospis dopasowany do <Accent>Twojego programu</Accent>
                        </h3>
                        <p className="text-lg text-text-dark/75 mt-4">Wybierasz program, a jadłospis i nawyki układają się pod niego.</p>
                        <ul className="grid sm:grid-cols-2 gap-3 mt-6 max-w-lg">
                            {PROGRAMS.map((p) => (
                                <li key={p.name} className="rounded-2xl bg-white px-5 py-3.5 shadow-soft">
                                    <p className="font-bold text-primary-green">{p.name}</p>
                                    <p className="text-sm text-text-dark/65">{p.sub}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-[480px] md:h-[540px] w-full max-w-md mx-auto">
                        <div className="absolute -right-10 top-[6%] w-[85%] aspect-square rounded-full bg-accent-pink/70" aria-hidden="true" />
                        <Phone src="/start/phone-2.png" alt="Jadłospis w aplikacji OH! Club" size="sm" className="absolute left-0 top-0" />
                        <Phone src="/screenshots/nawyki_v2.png" alt="Nawyki w aplikacji OH! Club" size="sm" className="absolute right-0 top-[12%]" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
                    <div className="relative flex justify-center order-last lg:order-first">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] rounded-full bg-accent-pink/70" aria-hidden="true" />
                        <Phone src="/screenshots/nawyki.png" alt="Rekomendowany trening na dziś w aplikacji OH! Club" className="relative" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-2xl md:text-3xl leading-snug text-primary-green">
                            Trening dopasowany do <Accent>Twojego cyklu</Accent>
                        </h3>
                        <p className="text-lg text-text-dark/75 mt-4 max-w-xl">
                            Aplikacja podpowiada trening na dany dzień cyklu. Nie masz na niego ochoty? Wybierasz alternatywę
                            dopasowaną do tej samej fazy: HIIT, kettlebell, taneczne cardio czy barre.
                        </p>
                        <ul className="mt-5 space-y-2 font-bold text-primary-green">
                            {["Intensywniej, gdy masz energię", "Łagodniej, gdy organizm prosi o spokój", "Bez poczucia winy"].map((t) => (
                                <li key={t} className="flex items-center gap-2">
                                    <CheckIcon /> {t}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-7">
                            <CtaLink />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export type CarePerson = { title: string; sub: string; photo: string | null };

export function CareSection({ people }: { people: CarePerson[] }) {
    return (
        <section className="px-6 pb-20">
            <div className="max-w-6xl mx-auto rounded-[2rem] bg-primary-green p-8 md:p-10 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-8 items-center">
                <div>
                    <Pill tone="solid">OH! Club Care</Pill>
                    <h2 className="font-serif font-bold text-2xl md:text-3xl leading-snug text-cream mt-4">Indywidualne zalecenia i kontakt z ekspertem</h2>
                    <p className="text-cream/80 mt-3 leading-relaxed">
                        Nie zostajesz sama z aplikacją i zaleceniami. W planie Care możesz pytać o wszystko, a zweryfikowany
                        ekspert odpowie na Twoje pytania.
                    </p>
                </div>
                <ul className="space-y-3">
                    {people.map((p) => (
                        <li key={p.title} className="flex items-center gap-4 rounded-3xl bg-white px-4 py-3.5">
                            <span className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden bg-accent-pink/40 flex items-center justify-center font-bold text-primary-green">
                                {p.photo ? <Image src={p.photo} alt={p.title} fill sizes="48px" className="object-cover object-top" /> : p.title[0]}
                            </span>
                            <span>
                                <span className="block font-bold text-text-dark">{p.title}</span>
                                <span className="block text-sm text-text-dark/65">{p.sub}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

const COMPARE = [
    { what: "Dietetyk hormonalny", alone: "ok. 800 zł / mies.", us: "Plan Care: kontakt z dietetykiem" },
    { what: "Trener personalny online", alone: "ok. 400 zł / mies.", us: "Treningi dopasowane do cyklu" },
    { what: "Aplikacja do kalorii (premium)", alone: "ok. 49 zł / mies.", us: "Liczenie kalorii, bez reklam" },
    { what: "Konsultacja z kosmetologiem", alone: "ok. 150 zł jednorazowo", us: "Rytuały pielęgnacyjne od kosmetologa" },
    { what: "Jadłospis, nawyki, społeczność", alone: "nie ma w jednym miejscu", us: "W cenie planu" },
];

export function CompareSection() {
    const cell = "px-4 md:px-6 py-3.5 border-b border-black/5";
    return (
        <section className="bg-accent-pink py-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center">
                    <Pill tone="white">Porównanie</Pill>
                    <h2 className="font-serif font-bold text-3xl md:text-[2.75rem] leading-tight tracking-tight text-primary-green mt-4">
                        Czy to się <Accent>opłaca</Accent>?
                    </h2>
                    <p className="text-text-dark/70 mt-2">Zobacz, ile kosztuje to samo, kupowane osobno.</p>
                </div>
                {/* Telefon: karty zamiast tabeli, żeby kolumna "W OH! Club" nie wypadała poza ekran. */}
                <ul className="md:hidden mt-8 space-y-3">
                    {COMPARE.map((r) => (
                        <li key={r.what} className="rounded-3xl bg-white overflow-hidden shadow-soft">
                            <div className="px-5 pt-4 pb-3">
                                <p className="font-bold text-text-dark">{r.what}</p>
                                <p className="text-sm text-text-dark/65 mt-0.5">Osobno: {r.alone}</p>
                            </div>
                            <p className="flex items-center gap-2 bg-primary-green px-5 py-3 text-sm text-cream">
                                <CheckIcon className="w-4 h-4 text-accent-pink" /> {r.us}
                            </p>
                        </li>
                    ))}
                    <li className="rounded-3xl bg-primary-green px-5 py-4 text-cream">
                        <p className="font-bold">Razem miesięcznie</p>
                        <p className="mt-1">
                            <span className="line-through text-cream/60 mr-3">1250-1400 zł</span>
                            <span className="font-bold text-2xl text-accent-pink">49,99-129,99 zł</span>
                        </p>
                    </li>
                </ul>
                <div className="hidden md:block mt-8 overflow-x-auto rounded-[1.75rem] shadow-card">
                    <table className="w-full min-w-[40rem] text-left text-sm md:text-base">
                        <thead>
                            <tr className="text-xs font-bold uppercase tracking-[0.12em]">
                                <th className={`${cell} bg-white text-text-dark/60`}>Co dostajesz</th>
                                <th className={`${cell} bg-white text-text-dark/60`}>Osobno</th>
                                <th className={`${cell} bg-primary-green text-accent-pink border-white/10`}>W OH! Club</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPARE.map((r) => (
                                <tr key={r.what}>
                                    <td className={`${cell} bg-white font-bold text-text-dark`}>{r.what}</td>
                                    <td className={`${cell} bg-white text-text-dark/75`}>{r.alone}</td>
                                    <td className={`${cell} bg-primary-green text-cream border-white/10`}>
                                        <span className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 text-accent-pink" /> {r.us}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="px-4 md:px-6 py-5 bg-white font-bold text-text-dark">Razem miesięcznie</td>
                                <td className="px-4 md:px-6 py-5 bg-white font-serif font-bold text-xl text-text-dark/60 line-through">1250-1400 zł</td>
                                <td className="px-4 md:px-6 py-5 bg-primary-green font-serif font-bold text-2xl text-accent-pink">49,99-129,99 zł</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-7">
                    <span className="inline-flex rounded-full bg-primary-green px-6 py-2.5 font-bold text-cream">Oszczędzasz ponad 1100 zł miesięcznie*</span>
                    <p className="text-xs text-text-dark/65 mt-3">*Szacunkowe ceny rynkowe usług i aplikacji.</p>
                </div>
            </div>
        </section>
    );
}

export type ConsultationOffer = { priceLabel: string; carePriceLabel: string; durationMinutes: number | null };

export function PlansSection({ consultation }: { consultation: ConsultationOffer | null }) {
    const list = "mt-5 space-y-2";
    const item = "flex items-start gap-2";
    return (
        <section className="bg-light-cream py-20 lg:py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center">
                    <Pill>Plany</Pill>
                    <h2 className="font-serif font-bold text-3xl md:text-[2.75rem] leading-tight tracking-tight text-primary-green mt-4">
                        Wybierz swój <Accent>poziom wsparcia</Accent>
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-5 mt-12 items-stretch">
                    <article className="rounded-[1.75rem] bg-white p-7 flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-text-dark/60">OH! Club</p>
                        <p className="font-serif font-bold text-4xl text-primary-green mt-3">
                            49,99 zł<span className="text-base font-sans font-medium text-text-dark/60">/mies.</span>
                        </p>
                        <ul className={list}>
                            {["Quiz i plan dopasowany do cyklu", "Jadłospisy, treningi, rytuały", "Dziennik i nawyki", "Baza wiedzy o hormonach"].map((t) => (
                                <li key={t} className={item}><CheckIcon className="w-4 h-4 mt-1 text-primary-green" /> {t}</li>
                            ))}
                        </ul>
                        <div className="mt-auto pt-7"><Link href="/pobierz" className="block text-center rounded-full border-2 border-primary-green px-6 py-3 font-bold text-primary-green hover:bg-primary-green hover:text-cream transition-colors">Wybieram OH! Club</Link></div>
                    </article>
                    <article className="relative rounded-[1.75rem] bg-primary-green p-7 flex flex-col text-cream md:-mt-4 md:mb-0">
                        <Pill tone="solid" className="self-start">Pełna opieka</Pill>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent-pink mt-4">OH! Club Care</p>
                        <p className="font-serif font-bold text-4xl mt-3">
                            129,99 zł<span className="text-base font-sans font-medium text-cream/70">/mies.</span>
                        </p>
                        <ul className={list}>
                            {["Wszystko z OH! Club", "Czat z ekspertem OH! Club Care", "30% zniżki na konsultacje online"].map((t) => (
                                <li key={t} className={item}><CheckIcon className="w-4 h-4 mt-1 text-accent-pink" /> {t}</li>
                            ))}
                        </ul>
                        <div className="mt-auto pt-7"><Link href="/pobierz" className="block text-center rounded-full bg-accent-pink px-6 py-3 font-bold text-text-dark hover:brightness-95 transition">Wybieram Care</Link></div>
                    </article>
                    <article className="rounded-[1.75rem] bg-white p-7 flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-text-dark/60">Konsultacja online</p>
                        <p className="font-serif font-bold text-4xl text-primary-green mt-3">
                            {consultation?.priceLabel ?? "od 249 zł"}
                            <span className="text-base font-sans font-medium text-text-dark/60"> jednorazowo</span>
                        </p>
                        <ul className={list}>
                            {["Wideorozmowa ze specjalistką", "Omówienie wyników badań", "Spersonalizowana suplementacja"].map((t) => (
                                <li key={t} className={item}><CheckIcon className="w-4 h-4 mt-1 text-primary-green" /> {t}</li>
                            ))}
                        </ul>
                        {consultation && <p className="font-bold text-primary-green mt-3">{consultation.carePriceLabel} z OH! Club Care (-30%)</p>}
                        <div className="mt-auto pt-7"><Link href="/konsultacje" className="block text-center rounded-full border-2 border-primary-green px-6 py-3 font-bold text-primary-green hover:bg-primary-green hover:text-cream transition-colors">Umów konsultację</Link></div>
                    </article>
                </div>
                <p className="text-center text-sm text-text-dark/65 mt-8 max-w-2xl mx-auto">
                    7 dni za darmo, potem subskrypcja odnawia się automatycznie. Plan zmienisz lub anulujesz w każdej chwili w
                    ustawieniach App Store lub Google Play.{consultation?.durationMinutes ? ` Konsultacja trwa ${consultation.durationMinutes} minut.` : ""}
                </p>
            </div>
        </section>
    );
}

