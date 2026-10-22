// Czysta logika prezentacji konsultacji, bez fetchy i sekretów, więc bezpieczna
// do importu w komponentach klienckich (w przeciwieństwie do lib/consultations.ts).
// Patrz SPEC-new-consultations.md §4.

export type VatTreatment = "exempt" | "standard23";

export type BenefitIcon = "chat" | "chart" | "clipboard" | "leaf" | "pill" | "calendar";

export type ExpertBenefit = {
    title: string;
    subtitle: string;
    icon: BenefitIcon;
};

export type Expert = {
    id: string;
    /** Slug do URL; gdy pusty, URL używa `id` (documentId). */
    slug: string | null;
    /** Nazwa usługi (faktura, Stripe), np. "Konsultacja dietetyczna". */
    name: string;
    /** Imię osoby do UI, np. "mgr Klaudia Kubrak". Puste u starych wpisów. */
    displayName: string;
    title: string;
    specialization: string;
    description: string;
    shortDescription: string;
    durationMinutes: number | null;
    benefits: ExpertBenefit[];
    avatarEmoji: string;
    photoUrl: string | null;
    priceGrosze: number;
    vatTreatment: VatTreatment;
};

const BENEFIT_ICONS: readonly BenefitIcon[] = ["chat", "chart", "clipboard", "leaf", "pill", "calendar"];

// Rabat członkiń OH! Club Care (SPEC-free-tier.md). Tylko do linijki zachęty na
// stronie eksperta; kwota płatności zawsze liczy się server-side z kodu.
export const CARE_DISCOUNT_PERCENT = 30;

/** "349 zł" dla pełnych złotych, "244,30 zł" dla groszy. */
export function formatPrice(grosze: number): string {
    const zl = grosze / 100;
    if (Number.isInteger(zl)) return `${zl} zł`;
    return `${zl.toFixed(2).replace(".", ",")} zł`;
}

export function discountedGrosze(priceGrosze: number, percent: number): number {
    return Math.round((priceGrosze * (100 - percent)) / 100);
}

/** Dopisek przy cenie zgodny z fakturą (D5). Brzmienie `exempt` do potwierdzenia z księgową. */
export function vatNote(vat: VatTreatment): string {
    return vat === "standard23" ? "Cena brutto (zawiera 23% VAT)" : "Cena końcowa (zwolniona z VAT)";
}

/** Krótka wersja dopisku do ciasnych miejsc (pasek na telefonie, apka). */
export function vatNoteShort(vat: VatTreatment): string {
    return vat === "standard23" ? "brutto" : "cena końcowa";
}

/** Nagłówek eksperta: displayName, a dla starych wpisów title (zawód + osoba) lub name. */
export function expertHeading(expert: Pick<Expert, "displayName" | "title" | "name">): string {
    return expert.displayName || expert.title || expert.name;
}

export function initials(name: string): string {
    return name
        .split(/\s+/)
        .filter((part) => part && !/^(mgr|dr|lek|inż|prof)\.?$/i.test(part))
        .slice(0, 2)
        .map((part) => part[0]!.toUpperCase())
        .join("");
}

export function expertPath(expert: Pick<Expert, "slug" | "id">): string {
    return `/konsultacje/${encodeURIComponent(expert.slug || expert.id)}`;
}

/** Kafel zastępczy / tło zdjęcia: blush i sage na zmianę. */
export function tileTone(index: number): "blush" | "sage" {
    return index % 2 === 0 ? "sage" : "blush";
}

type StrapiBenefit = { title?: string; subtitle?: string | null; icon?: string };

export type StrapiExpertEntry = {
    documentId: string;
    slug?: string | null;
    name?: string;
    displayName?: string | null;
    title?: string | null;
    specialization?: string;
    description?: string | null;
    shortDescription?: string | null;
    durationMinutes?: number | null;
    benefits?: StrapiBenefit[] | null;
    avatarEmoji?: string | null;
    photo?: { url?: string } | null;
    priceGrosze?: number;
    vatTreatment?: string;
};

export function mapStrapiExpert(e: StrapiExpertEntry, resolveMediaUrl: (url?: string | null) => string | null): Expert {
    return {
        id: e.documentId,
        slug: e.slug || null,
        name: (e.name ?? "").trim(),
        displayName: (e.displayName ?? "").trim(),
        title: (e.title ?? "").trim(),
        specialization: (e.specialization ?? "").trim(),
        description: e.description ?? "",
        shortDescription: e.shortDescription ?? "",
        durationMinutes: typeof e.durationMinutes === "number" && e.durationMinutes > 0 ? e.durationMinutes : null,
        benefits: (e.benefits ?? [])
            .filter((b) => !!b?.title)
            .map((b) => ({
                title: b.title!,
                subtitle: b.subtitle ?? "",
                icon: BENEFIT_ICONS.includes(b.icon as BenefitIcon) ? (b.icon as BenefitIcon) : "chat",
            })),
        avatarEmoji: e.avatarEmoji ?? "",
        photoUrl: resolveMediaUrl(e.photo?.url),
        priceGrosze: e.priceGrosze ?? 24900,
        vatTreatment: e.vatTreatment === "standard23" ? "standard23" : "exempt",
    };
}
