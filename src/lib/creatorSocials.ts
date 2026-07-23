// Statyczny mapping social media dla twórców treści — dopasowanie po imieniu, ponieważ
// kolekcja "creators" w Strapi nie ma jeszcze dedykowanych pól na social media (docelowo
// warto przenieść to jako pola w CMS, żeby redakcja mogła edytować bez zmian w kodzie).

export type CreatorSocials = {
    instagram?: string[];
    website?: string;
};

const CREATOR_SOCIALS: Record<string, CreatorSocials> = {
    wioleta: { instagram: ["kundzia241"] },
    klaudia: { instagram: ["klaudiakubrak_dietetyk"], website: "https://klaudiakubrak.pl" },
    iwona: { instagram: ["balanceapl"], website: "https://balancea.pl" },
    ewa: { instagram: ["beauty_and_health_studio_uk", "sakuralift_academy"] },
    katarzyna: { instagram: ["kasiadietetyk"], website: "https://kasiadietetyk.pl" },
};

export function getCreatorSocials(name: string): CreatorSocials | undefined {
    const key = Object.keys(CREATOR_SOCIALS).find((k) => name.toLowerCase().includes(k));
    return key ? CREATOR_SOCIALS[key] : undefined;
}
