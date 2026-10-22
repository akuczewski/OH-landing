"use client";

import Link from "next/link";
import ExpertPhoto from "./ExpertPhoto";
import {
    expertHeading,
    expertPath,
    formatPrice,
    tileTone,
    type Expert,
} from "@/lib/consultationFormat";

function trackSelect(expert: Expert) {
    if (typeof window.gtag === "function") {
        window.gtag("event", "select_item", {
            item_list_name: "konsultacje",
            items: [{ item_id: expert.id, item_name: expert.name, item_category: expert.specialization }],
        });
    }
}

function CardMeta({ expert }: { expert: Expert }) {
    return (
        <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-text-dark/60">
                {expert.durationMinutes ? `${expert.durationMinutes} min · online` : "Online"}
            </span>
            <span className="font-bold text-primary-green whitespace-nowrap">{formatPrice(expert.priceGrosze)}</span>
        </div>
    );
}

function CardText({ expert, clamp }: { expert: Expert; clamp: string }) {
    return (
        <>
            {expert.specialization && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-pink-deep">
                    {expert.specialization}
                </p>
            )}
            <h2 className="font-serif text-2xl text-text-dark font-bold mt-2 leading-tight">{expertHeading(expert)}</h2>
            <p className={`text-[15px] text-text-dark/70 leading-relaxed mt-2 ${clamp}`}>
                {expert.shortDescription || expert.description}
            </p>
        </>
    );
}

const MORE_BUTTON =
    "block w-full text-center rounded-full border-2 border-primary-green/80 py-2.5 font-bold text-primary-green transition-colors group-hover:bg-primary-green group-hover:text-light-cream";

/** Karta pionowa do siatki (2+ ekspertów). Cała karta jest linkiem. */
export function ExpertCard({ expert, index }: { expert: Expert; index: number }) {
    return (
        <Link
            href={expertPath(expert)}
            onClick={() => trackSelect(expert)}
            className="group flex flex-col bg-white rounded-[2rem] shadow-card overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-primary-green"
        >
            <div className="aspect-[4/5] sm:aspect-[6/5]">
                <ExpertPhoto
                    expert={expert}
                    tone={tileTone(index)}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                />
            </div>
            <div className="flex flex-1 flex-col p-6">
                <CardText expert={expert} clamp="line-clamp-3" />
                <div className="mt-auto pt-5 space-y-4">
                    <CardMeta expert={expert} />
                    <span className={MORE_BUTTON}>Więcej informacji</span>
                </div>
            </div>
        </Link>
    );
}

/** Karta pozioma, gdy aktywny jest jeden ekspert (D7). */
export function ExpertCardWide({ expert }: { expert: Expert }) {
    return (
        <Link
            href={expertPath(expert)}
            onClick={() => trackSelect(expert)}
            className="group grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] bg-white rounded-[2rem] shadow-card overflow-hidden transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-primary-green"
        >
            <div className="aspect-[4/5] md:aspect-auto md:min-h-[26rem]">
                <ExpertPhoto expert={expert} tone="sage" sizes="(min-width: 768px) 420px, 100vw" priority />
            </div>
            <div className="flex flex-col p-6 md:p-10">
                <CardText expert={expert} clamp="line-clamp-4" />
                <div className="mt-auto pt-6 space-y-4">
                    <CardMeta expert={expert} />
                    <span className={MORE_BUTTON}>Więcej informacji</span>
                </div>
            </div>
        </Link>
    );
}

/** Zapowiedź kolejnych ekspertów, widoczna przy 1–2 aktywnych (D7). */
export function ComingSoonCard() {
    return (
        <div className="flex flex-col justify-center rounded-[2rem] border-2 border-dashed border-primary-green/20 bg-light-cream/60 p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-pink-deep">Wkrótce</p>
            <h2 className="font-serif text-2xl text-primary-green font-bold mt-3 leading-tight">
                Kolejni eksperci OH! Club
            </h2>
            <p className="text-[15px] text-text-dark/65 leading-relaxed mt-3">
                Pracujemy nad poszerzeniem zespołu o kolejne specjalizacje, m.in. kosmetologię.
                Zajrzyj tu niedługo.
            </p>
        </div>
    );
}
