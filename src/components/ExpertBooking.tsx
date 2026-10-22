"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ConsultationCheckoutForm from "./ConsultationCheckoutForm";
import {
    CARE_DISCOUNT_PERCENT,
    discountedGrosze,
    formatPrice,
    vatNote,
    vatNoteShort,
    type Expert,
} from "@/lib/consultationFormat";

const CTA_CLASS =
    "inline-flex items-center justify-center rounded-full bg-primary-green px-8 py-4 text-base font-bold text-light-cream shadow-soft transition-all duration-300 hover:bg-secondary-green active:scale-[0.98]";

/** Cena + dopisek VAT. Używane też jako statyczny fallback przed hydracją (bez rabatu). */
export function ExpertPrice({ expert, discountPercent = 0 }: { expert: Expert; discountPercent?: number }) {
    const finalGrosze = discountedGrosze(expert.priceGrosze, discountPercent);
    return (
        <div>
            <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-serif text-4xl font-bold text-primary-green">{formatPrice(finalGrosze)}</span>
                {discountPercent > 0 && (
                    <span className="text-lg text-text-dark/40 line-through">{formatPrice(expert.priceGrosze)}</span>
                )}
            </div>
            <p className="text-sm text-text-dark/60 mt-1">{vatNote(expert.vatTreatment)}</p>
        </div>
    );
}

/** Statyczna wersja bloku zakupu (fallback Suspense): cena + link do formularza. */
export function ExpertBookingFallback({ expert }: { expert: Expert }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-5">
            <ExpertPrice expert={expert} />
            <a href="?checkout=1#zamow" className={CTA_CLASS}>
                Umów konsultację
            </a>
        </div>
    );
}

/**
 * Blok zakupu na stronie eksperta (SPEC-new-consultations §5.3): cena, zachęta
 * OH! Club Care, "Umów konsultację" rozwijające checkout, przyklejony pasek na mobile.
 */
export default function ExpertBooking({ expert }: { expert: Expert }) {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const startsOpen = params.get("checkout") === "1" || params.get("anulowano") === "1";
    const hasUrlCode = !!params.get("code");

    const [open, setOpen] = useState(startsOpen);
    const [discountPercent, setDiscountPercent] = useState(0);
    const formRef = useRef<HTMLDivElement>(null);
    const handleDiscountChange = useCallback((percent: number) => setDiscountPercent(percent), []);

    useEffect(() => {
        if (typeof window.gtag === "function") {
            window.gtag("event", "view_item", {
                currency: "PLN",
                value: expert.priceGrosze / 100,
                items: [{ item_id: expert.id, item_name: expert.name, item_category: expert.specialization }],
            });
        }
    }, [expert]);

    // Wejście z ?checkout=1 (apka, cancel_url) → od razu przewiń do formularza.
    useEffect(() => {
        if (startsOpen) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function openCheckout() {
        setOpen(true);
        const next = new URLSearchParams(params.toString());
        next.set("checkout", "1");
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
        requestAnimationFrame(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }

    function trackUpsell() {
        if (typeof window.gtag === "function") {
            window.gtag("event", "click_care_upsell", { item_id: expert.id });
        }
    }

    // Zachęta znika, gdy kod jest zatwierdzony albo właśnie przyszedł z apki (D6).
    const showUpsell = discountPercent === 0 && !hasUrlCode;

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-5">
                <ExpertPrice expert={expert} discountPercent={discountPercent} />
                {!open && (
                    <button type="button" onClick={openCheckout} className={`${CTA_CLASS} hidden sm:inline-flex`}>
                        Umów konsultację
                    </button>
                )}
            </div>

            {showUpsell && (
                <p className="mt-4 text-sm text-text-dark/65">
                    Członkinie OH! Club Care płacą{" "}
                    <strong className="text-primary-green">
                        {formatPrice(discountedGrosze(expert.priceGrosze, CARE_DISCOUNT_PERCENT))}
                    </strong>{" "}
                    (−{CARE_DISCOUNT_PERCENT}%).{" "}
                    <Link
                        href="/pobierz"
                        onClick={trackUpsell}
                        className="font-semibold text-primary-green underline underline-offset-4"
                    >
                        Pobierz aplikację
                    </Link>
                </p>
            )}

            <p className="mt-4 text-sm text-text-dark/60">Po opłaceniu samodzielnie wybierasz dogodny termin.</p>

            <div id="zamow" ref={formRef} className="scroll-mt-28">
                {open && (
                    <div className="mt-8 rounded-[2rem] bg-white/70 p-5 sm:p-7 ring-1 ring-black/[0.05]">
                        <h2 className="font-serif text-2xl font-bold text-primary-green mb-5">Zamów konsultację</h2>
                        <ConsultationCheckoutForm expert={expert} onDiscountChange={handleDiscountChange} />
                    </div>
                )}
            </div>

            {/* Przyklejony pasek na telefonie, dopóki formularz jest zwinięty. */}
            {!open && (
                <>
                    <div className="h-24 sm:hidden" aria-hidden="true" />
                    <div className="fixed inset-x-0 bottom-0 z-40 sm:hidden border-t border-black/[0.06] bg-light-cream/95 backdrop-blur px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="font-serif text-2xl font-bold text-primary-green leading-none">
                                    {formatPrice(discountedGrosze(expert.priceGrosze, discountPercent))}
                                </p>
                                <p className="text-xs text-text-dark/55 mt-1">{vatNoteShort(expert.vatTreatment)}</p>
                            </div>
                            <button type="button" onClick={openCheckout} className={`${CTA_CLASS} px-6 py-3.5 shrink-0`}>
                                Umów konsultację
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
