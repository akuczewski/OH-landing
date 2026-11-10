import Image from "next/image";
import { Accent, CheckIcon, CtaLink, Flower, Phone, Pill } from "./ui";

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export function HeroSection({ klaudiaPhoto }: { klaudiaPhoto: string | null }) {
    return (
        <section className="pt-32 lg:pt-36 pb-20 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-14 lg:gap-12 items-center">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <Pill className="enter">Dla kobiet, które mają dość zgadywania</Pill>
                    <h1 className="enter font-serif font-bold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-primary-green mt-6" style={delay(100)}>
                        Masz dość słyszeć, że to <Accent>„taka Twoja uroda”</Accent>?
                    </h1>
                    <p className="enter text-lg text-text-dark/75 leading-relaxed max-w-xl mt-6" style={delay(180)}>
                        Trądzik, zmęczenie, PMS i cykl, który robi, co chce. To nie przypadek. OH! Club pokazuje, co próbuje
                        Ci powiedzieć Twój organizm, i prowadzi Cię krok po kroku.
                    </p>
                    <div className="enter flex flex-wrap items-center justify-center lg:justify-start gap-x-7 gap-y-3 mt-8" style={delay(260)}>
                        <CtaLink />
                        <a href="#jak-to-dziala" className="font-bold text-primary-green hover:underline underline-offset-4">
                            Zobacz, jak to działa →
                        </a>
                    </div>
                    <ul className="enter flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 mt-7 font-semibold text-primary-green" style={delay(320)}>
                        {["Plan dopasowany do cyklu", "Eksperci online", "7 dni za darmo"].map((t) => (
                            <li key={t} className="flex items-center gap-1.5">
                                <CheckIcon /> {t}
                            </li>
                        ))}
                    </ul>
                    <p className="enter text-sm text-text-dark/60 mt-4" style={delay(360)}>Quiz zajmuje 2 minuty · iOS i Android</p>
                </div>

                <div className="enter relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto pb-24 sm:pb-16" style={delay(160)}>
                    <div className="absolute -right-4 top-[30%] w-24 h-64 rounded-full bg-accent-pink/70" aria-hidden="true" />
                    <Flower className="absolute -right-2 -top-4 w-14 h-14 z-10" />
                    <div className="relative aspect-[4/5] rounded-t-full rounded-b-[2.5rem] overflow-hidden bg-light-cream">
                        {klaudiaPhoto && (
                            <Image src={klaudiaPhoto} alt="Klaudia Kubrak, dietetyk kliniczny" fill sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover object-top" priority />
                        )}
                    </div>
                    <figure className="absolute left-0 sm:-left-8 bottom-0 max-w-[19rem] rounded-3xl bg-white p-5 shadow-card ring-1 ring-black/5">
                        <blockquote className="font-serif italic font-bold text-lg leading-snug text-primary-green">
                            „Półtora roku bez miesiączki, insulinooporność, hiperandrogenizm. Wiem, jak to jest…”
                        </blockquote>
                        <figcaption className="text-sm text-text-dark/70 mt-3 leading-snug">
                            <strong className="text-text-dark">Klaudia</strong>, dietetyk kliniczny i założycielka OH! Club. Dziś pomagam
                            kobietom zrozumieć ich hormony.
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}

const SIGNALS = ["Nieregularny cykl", "Nasilony PMS", "Trądzik i skóra", "Wypadanie włosów", "Zmęczenie", "Ochota na słodycze", "Wzdęcia", "Problemy ze snem"];
const PHASES = [
    { color: "#C75B82", label: "Miesiączka: odpoczynek i regeneracja" },
    { color: "#F2B6C9", label: "Faza folikularna: rosnąca energia" },
    { color: "#F5C9A6", label: "Owulacja: szczyt formy" },
    { color: "#B5CBA0", label: "Faza lutealna: zwolnienie i wyciszenie" },
];

function CycleRing() {
    // 4 łuki z przerwami, start na górze, zgodnie z ruchem wskazówek zegara.
    const r = 80, c = 2 * Math.PI * r, gap = 14, seg = c / 4 - gap;
    return (
        <svg viewBox="0 0 200 200" className="w-52 h-52 md:w-60 md:h-60 -rotate-90" aria-hidden="true">
            {PHASES.map((p, i) => (
                <circle key={p.label} cx="100" cy="100" r={r} fill="none" stroke={p.color} strokeWidth="20" strokeLinecap="round" strokeDasharray={`${seg} ${c - seg}`} strokeDashoffset={-(i * (c / 4) + gap / 2)} />
            ))}
        </svg>
    );
}

export function SignalsSection() {
    return (
        <section className="bg-light-cream py-20 lg:py-24 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <Pill>Czy to o Tobie?</Pill>
                    <h2 className="font-serif font-bold text-3xl md:text-[2.6rem] leading-[1.12] tracking-tight text-primary-green mt-5">
                        Wiele kobiet latami żyje z sygnałami, które wydają się <Accent>„normalne”</Accent>
                    </h2>
                    <p className="text-lg text-text-dark/75 leading-relaxed mt-5 max-w-xl">
                        Zmęczenie, wahania nastroju czy nieregularny cykl często traktujemy jak coś, z czym trzeba się pogodzić.
                        Bywają to sygnały, że warto dać organizmowi więcej wsparcia.
                    </p>
                    <ul className="flex flex-wrap gap-2.5 mt-7 max-w-lg">
                        {SIGNALS.map((s) => (
                            <li key={s} className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 font-bold text-text-dark shadow-soft">
                                <span className="w-2 h-2 rounded-full bg-accent-pink-deep/60" /> {s}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm italic text-text-dark/65 mt-6 max-w-lg">
                        To nie jest diagnoza. Jeśli któryś z sygnałów Cię niepokoi, skonsultuj się z lekarzem.
                    </p>
                </div>
                <div className="rounded-[2rem] bg-white p-8 md:p-10 shadow-soft">
                    <div className="relative w-fit mx-auto">
                        <CycleRing />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <p className="font-serif font-bold text-2xl text-primary-green">Twój cykl</p>
                            <p className="text-sm text-text-dark/65">4 fazy, 4 potrzeby</p>
                        </div>
                    </div>
                    <ul className="mt-8 space-y-2.5 max-w-sm mx-auto">
                        {PHASES.map((p) => (
                            <li key={p.label} className="flex items-center gap-3 text-text-dark/85">
                                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ background: p.color }} /> {p.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

const DISHES = [
    { src: "/nowy-landing/frittata.jpg", alt: "Frittata z ziołami" },
    { src: "/nowy-landing/bowl-losos.jpg", alt: "Bowl z łososiem i awokado" },
    { src: "/nowy-landing/czekolada.jpg", alt: "Domowa czekolada" },
];

export function SolutionSection() {
    const card = "rounded-[1.75rem] bg-white p-6 flex flex-col";
    const cardTitle = "font-serif font-bold text-xl leading-snug text-primary-green mt-5";
    return (
        <section className="relative bg-primary-green text-cream pt-20 pb-20 lg:pb-24 px-6">
            <span className="absolute left-1/2 -top-6 -translate-x-1/2 w-12 h-12 rounded-full bg-accent-pink text-primary-green flex items-center justify-center text-xl font-bold shadow-soft" aria-hidden="true">
                ↓
            </span>
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 items-center">
                    <div>
                        <Pill tone="solid">Rozwiązanie: OH! Club</Pill>
                        <h2 className="font-serif font-bold text-3xl md:text-[2.75rem] leading-[1.1] tracking-tight text-cream mt-5">
                            Holistyczny plan, który wspiera <Accent tone="pink">Twoje hormony</Accent>
                        </h2>
                        <p className="text-lg text-cream/80 leading-relaxed mt-5 max-w-xl">
                            Autorskie przepisy i system opracowany przez dietetyczkę kliniczną. Większość aplikacji dietetycznych
                            opiera się na zakazach. OH! Club zamiast zakazywać, wspiera Twoje ciało i hormony.
                        </p>
                        <ul className="mt-7 space-y-3 max-w-xl">
                            {["Mniej zmęczenia, stabilniejsza waga", "Spokojniejsza skóra i więcej pewności siebie", "Mniej napięcia, więcej spokoju"].map((t) => (
                                <li key={t} className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-5 py-3.5 font-bold">
                                    <CheckIcon className="w-4 h-4 text-accent-pink" /> {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative h-[480px] md:h-[540px] w-full max-w-md mx-auto">
                        <div className="absolute right-0 top-[8%] w-[80%] aspect-square rounded-full bg-accent-pink/80" aria-hidden="true" />
                        <Flower className="absolute right-0 top-0 w-12 h-12" />
                        <Phone src="/start/phone-2.png" alt="Jadłospis w aplikacji OH! Club" size="sm" className="absolute left-0 top-0" />
                        <Phone src="/screenshots/nawyki_v2.png" alt="Nawyki w aplikacji OH! Club" size="sm" className="absolute right-2 top-[14%]" />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 text-text-dark">
                    <article className={card}>
                        <div className="flex gap-2 h-10 items-center">
                            {["#C75B82", "#F2B6C9", "#F5C9A6", "#B5CBA0"].map((c) => (
                                <span key={c} className="w-3.5 h-3.5 rounded-full" style={{ background: c }} />
                            ))}
                        </div>
                        <h3 className={cardTitle}>Odżywianie z myślą o hormonach</h3>
                        <p className="text-text-dark/70 mt-2 leading-relaxed">Potrzeby zmieniają się wraz z cyklem, dlatego aplikacja dopasowuje się do Ciebie.</p>
                    </article>
                    <article className={card}>
                        <div className="flex gap-2 h-10">
                            {DISHES.map((d) => (
                                <img key={d.src} src={d.src} alt={d.alt} className="w-14 h-10 rounded-lg object-cover" />
                            ))}
                        </div>
                        <h3 className={cardTitle}>Gotowe jadłospisy, mniej myślenia</h3>
                        <p className="text-text-dark/70 mt-2 leading-relaxed">Uporządkowany jadłospis dopasowany do Twoich potrzeb i celu.</p>
                    </article>
                    <article className={card}>
                        <div className="flex flex-wrap gap-2 min-h-10">
                            {["HIIT", "Barre", "Pilates"].map((t) => (
                                <Pill key={t}>{t}</Pill>
                            ))}
                        </div>
                        <h3 className={cardTitle}>Treningi dopasowane do cyklu</h3>
                        <p className="text-text-dark/70 mt-2 leading-relaxed">Nie zawsze musisz „cisnąć na 100%”. Aplikacja Cię poprowadzi.</p>
                    </article>
                    <article className={card}>
                        <div className="flex flex-wrap gap-2 min-h-10">
                            {["nawodnienie", "sen", "kroki", "pielęgnacja"].map((t) => (
                                <Pill key={t}>{t}</Pill>
                            ))}
                        </div>
                        <h3 className={cardTitle}>Nawyki na autopilocie</h3>
                        <p className="text-text-dark/70 mt-2 leading-relaxed">Aplikacja pomoże Ci je wypracować.</p>
                    </article>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-3 mt-16">
                    <h3 className="font-serif font-bold text-2xl md:text-3xl text-cream">
                        Autorskie przepisy <Accent tone="pink">na każdy dzień</Accent>
                    </h3>
                    <p className="text-sm text-cream/75">Opracowane przez dietetyczkę kliniczną</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                    {[
                        { src: "/nowy-landing/bowl-losos.jpg", label: "Bowl z łososiem i awokado" },
                        { src: "/nowy-landing/frittata.jpg", label: "Frittata z cukinią i ziołami" },
                        { src: "/nowy-landing/fondant.jpg", label: "Czekoladowy fondant" },
                    ].map((r) => (
                        <figure key={r.src} className="relative aspect-square rounded-[1.75rem] overflow-hidden">
                            <img src={r.src} alt={r.label} className="w-full h-full object-cover" />
                            <figcaption className="absolute left-3 bottom-3 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-text-dark">{r.label}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PlanIcon({ kind }: { kind: "meal" | "training" | "ritual" }) {
    if (kind === "meal")
        return (
            <svg viewBox="0 0 48 40" className="w-11 h-9 mx-auto" aria-hidden="true">
                <circle cx="17" cy="14" r="6" fill="#B5CBA0" /><circle cx="25" cy="10" r="6.5" fill="#F5C9A6" /><circle cx="32" cy="15" r="5.5" fill="#C75B82" />
                <path d="M6 18h36a18 16 0 0 1-36 0z" fill="#F2B6C9" />
            </svg>
        );
    if (kind === "training")
        return (
            <svg viewBox="0 0 48 40" className="w-11 h-9 mx-auto" aria-hidden="true">
                <rect x="4" y="13" width="7" height="14" rx="2" fill="#556749" /><rect x="11" y="10" width="6" height="20" rx="2" fill="#556749" />
                <rect x="17" y="18" width="14" height="4" fill="#556749" />
                <rect x="31" y="10" width="6" height="20" rx="2" fill="#556749" /><rect x="37" y="13" width="7" height="14" rx="2" fill="#556749" />
            </svg>
        );
    return (
        <svg viewBox="0 0 48 40" className="w-11 h-9 mx-auto" aria-hidden="true">
            <path d="M20 4c6 9 10 14 10 20a10 10 0 0 1-20 0c0-6 4-11 10-20z" fill="#98A66C" />
            <path d="M36 14c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10z" fill="#F2B6C9" />
        </svg>
    );
}

function StepNumber({ n }: { n: number }) {
    return <span className="relative z-10 w-11 h-11 shrink-0 rounded-full bg-primary-green text-cream font-bold flex items-center justify-center">{n}</span>;
}

export function HowItWorksSection() {
    const box = "flex-1 rounded-[1.75rem] bg-white p-6 md:p-7 shadow-soft";
    return (
        <section id="jak-to-dziala" className="scroll-mt-28 py-20 lg:py-24 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-14 items-center">
                <div className="relative hidden lg:flex justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] rounded-full bg-accent-pink/70" aria-hidden="true" />
                    <Flower className="absolute left-4 top-0 w-14 h-14 z-10" />
                    <Phone src="/screenshots/nawyki_v2.png" alt="Nawyki w aplikacji OH! Club" className="relative" />
                </div>
                <div>
                    <h2 className="font-serif font-bold text-3xl md:text-[2.75rem] leading-tight tracking-tight text-primary-green">
                        Jak to działa: <Accent>3 kroki</Accent>
                    </h2>
                    <p className="text-lg text-text-dark/70 mt-2">Od quizu do planu w 2 minuty.</p>

                    <ol className="relative mt-8 space-y-4">
                        <span className="absolute left-[21px] top-6 bottom-6 w-1 rounded-full bg-accent-pink" aria-hidden="true" />
                        <li className="flex gap-4 md:gap-5">
                            <StepNumber n={1} />
                            <div className={box}>
                                <h3 className="text-xl font-bold">Wypełnij quiz</h3>
                                <p className="text-text-dark/70 mt-1">Opowiadasz o objawach, cyklu i stylu życia.</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {["Cykl", "Skóra", "Energia", "Sen"].map((t) => (
                                        <span key={t} className="flex items-center gap-1.5 rounded-full bg-accent-pink/60 px-3.5 py-1.5 text-sm font-semibold text-primary-green">
                                            <CheckIcon className="w-3.5 h-3.5" /> {t}
                                        </span>
                                    ))}
                                    <span className="rounded-full bg-primary-green px-3.5 py-1.5 text-sm font-semibold text-cream">2 min</span>
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4 md:gap-5">
                            <StepNumber n={2} />
                            <div className={box}>
                                <h3 className="text-xl font-bold">Dostajesz swój plan</h3>
                                <p className="text-text-dark/70 mt-1">Jadłospis, trening i rytuały dopasowane do fazy cyklu.</p>
                                <div className="grid grid-cols-3 gap-2.5 mt-4 text-center">
                                    {[
                                        { t: "Jadłospis", s: "faza folikularna", bg: "bg-accent-pink/45", icon: "meal" as const },
                                        { t: "Trening", s: "dopasowany do cyklu", bg: "bg-cream", icon: "training" as const },
                                        { t: "Rytuał", s: "sen i nawodnienie", bg: "bg-secondary-green/20", icon: "ritual" as const },
                                    ].map((x) => (
                                        <div key={x.t} className={`rounded-2xl ${x.bg} px-2 py-4`}>
                                            <PlanIcon kind={x.icon} />
                                            <p className="font-bold text-primary-green mt-1.5">{x.t}</p>
                                            <p className="text-xs md:text-sm text-text-dark/65 leading-snug">{x.s}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </li>
                        <li className="flex gap-4 md:gap-5">
                            <StepNumber n={3} />
                            <div className={box}>
                                <h3 className="text-xl font-bold">Obserwujesz i pytasz</h3>
                                <p className="text-text-dark/70 mt-1">Dziennik pokazuje wzorce, a eksperci pomagają je zrozumieć.</p>
                                <div className="flex items-end gap-2 mt-4">
                                    {[40, 60, 45, 75, 65, 90, 55].map((h, i) => (
                                        <span key={i} className={`w-3.5 rounded-md ${i === 5 ? "bg-accent-pink" : "bg-secondary-green/60"}`} style={{ height: `${h * 0.42}px` }} />
                                    ))}
                                    <span className="ml-3 rounded-full bg-primary-green px-4 py-1.5 text-sm font-semibold text-cream">Zapytaj eksperta</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                    <div className="mt-8 lg:ml-16">
                        <CtaLink />
                    </div>
                </div>
            </div>
        </section>
    );
}
