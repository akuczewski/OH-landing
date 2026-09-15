export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohclub.app",
  name: "OH! Club",
  // Uwaga: podmiot z faktur/starej rejestracji — używany dziś tylko jako fallback
  // w treści polityki prywatności (lib/legal.ts), gdy CMS nie odpowiada.
  // Dane nowej spółki (KRS) są w `legalEntity` niżej i pokazywane na /kontakt —
  // do ustalenia z użytkownikiem, czy company/nip/address mają się zunifikować.
  company: "Great Skill Arkadiusz Kuczewski",
  nip: "7182147987",
  address: "Kazańska 14, Łomża",
  // Dane spółki OH! CLUB Sp. z o.o. — wyświetlane na /kontakt.
  legalEntity: {
    name: "OH! CLUB SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
    krs: "0001265249",
    nip: "5423519605",
    regon: "54567494300000",
    address: "Kawaleryjska 9/2, 15-324 Białystok",
  },
  contactEmail: "kontakt@ohclub.app",
  mediaEmail: "kontakt@ohclub.app",
  appStoreUrl: "https://apps.apple.com/us/app/oh-club/id6759370830",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.ohclub.app",
  socials: {
    instagram: "https://www.instagram.com/ohclub_pl/",
    facebook: "https://www.facebook.com/ohclubapp",
    tiktok: "https://www.tiktok.com/@oh.club",
  },
} as const;
