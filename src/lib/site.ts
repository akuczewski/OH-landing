export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ohclub.app",
  name: "OH! Club",
  company: "Great Skill Arkadiusz Kuczewski",
  nip: "7182147987",
  address: "Kazańska 14, Łomża",
  contactEmail: "kontakt@ohclub.app",
  mediaEmail: "media@ohclub.app",
  appStoreUrl: "https://apps.apple.com/us/app/oh-club/id6759370830",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.ohclub.app",
} as const;
