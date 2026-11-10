import type { ConsultationOffer } from "@/components/nowy/MiddleSections";
import { CARE_DISCOUNT_PERCENT, discountedGrosze, formatPrice } from "./consultationFormat";
import { getExperts } from "./consultations";

/** Karta "Konsultacja online" w cenniku: cena konsultacji Klaudii z CMS (albo pierwszego eksperta). */
export async function getConsultationOffer(): Promise<ConsultationOffer | null> {
    const experts = await getExperts().catch(() => []);
    const e = experts.find((x) => /klaudia/i.test(x.displayName)) ?? experts[0];
    if (!e) return null;
    return {
        priceLabel: formatPrice(e.priceGrosze),
        carePriceLabel: formatPrice(discountedGrosze(e.priceGrosze, CARE_DISCOUNT_PERCENT)),
        durationMinutes: e.durationMinutes,
    };
}
