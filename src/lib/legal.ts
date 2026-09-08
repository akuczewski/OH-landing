// Treść stron prawnych landingu (regulamin + polityka prywatności) — wyłącznie
// server-side (token Strapi nigdy w NEXT_PUBLIC_*).
//
// Wzorzec 1:1 z aplikacją mobilną (Profil → "Regulamin i prywatność",
// libs/features/frontend/library): czytamy kolekcję `privacy_sections` z CMS,
// a pełny fallback trzymamy w kodzie, żeby strona prawna nigdy nie była pusta —
// nawet gdy Strapi nie odpowiada. To ta sama kolekcja `privacy-section` co
// w apce; gdy admin ją wypełni, landing i apka pokazują tę samą treść.
//
// `body` jest w formacie Markdown (renderowany przez komponent <Prose>).

import { SITE } from "@/lib/site";

const STRAPI_URL = process.env.STRAPI_URL ?? "https://useful-sparkle-79935e08b6.strapiapp.com";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

export type PrivacySection = {
    id: string;
    title: string;
    /** Markdown */
    body: string;
    order: number;
    /** ISO — z CMS; brak dla fallbacku w kodzie */
    updatedAt?: string;
};

type StrapiPrivacySectionEntry = {
    id: number | string;
    documentId?: string;
    title?: string;
    body?: string;
    order?: number | null;
    updatedAt?: string;
};

/** Data ostatniej aktualizacji fallbacku w kodzie (gdy CMS nie podaje własnej). */
export const LEGAL_FALLBACK_LAST_UPDATED = "8 września 2026 r.";

/**
 * Stałe zastrzeżenie medyczne pokazywane nad sekcjami — jak baner w modalu apki
 * (Profil → "Regulamin i prywatność"). Markdown.
 */
export const MEDICAL_DISCLAIMER = {
    title: "Ważne zastrzeżenie medyczne",
    body: [
        "Aplikacja OH! Club została stworzona wyłącznie w celach wspierających zdrowy tryb życia oraz budowanie zdrowych nawyków.",
        "",
        "- **Brak charakteru medycznego:** Aplikacja nie jest wyrobem medycznym ani substytutem wizyty lub konsultacji lekarskiej.",
        "- **Konieczność konsultacji:** Wszystkie problemy zdrowotne powinny być niezwłocznie konsultowane ze specjalistą lub lekarzem.",
        "- **Brak gwarancji rezultatów:** Aplikacja nie gwarantuje osiągnięcia konkretnych rezultatów zdrowotnych ani poprawy stanu zdrowia. Efekty zależą od indywidualnych uwarunkowań organizmu.",
        "- **Obietnica zdrowotna:** Korzystanie z aplikacji nie stanowi obietnicy opanowania jakichkolwiek problemów zdrowotnych lub schorzeń.",
    ].join("\n"),
} as const;

// ============================================================
// Fallback — pełna treść regulaminu (§1–§6) i polityki prywatności.
// Używana, gdy kolekcja `privacy_sections` w CMS jest pusta lub Strapi
// nie odpowiada. Kolejność: najpierw regulamin, potem polityka.
// ============================================================

export const DEFAULT_PRIVACY_SECTIONS: PrivacySection[] = [
    {
        id: "regulamin-1",
        order: 10,
        title: "§1 Definicje",
        body: [
            "Pojęcia użyte w niniejszym Regulaminie, zarówno w liczbie pojedynczej, jak i mnogiej, mają następujące znaczenie:",
            "",
            "- **Usługodawca** – OH! Club (Właściciel serwisu), prowadzący działalność na rzecz Użytkowników zgodnie z obowiązującymi przepisami prawa.",
            "- **OH! Club** – aplikacja opracowana oraz prowadzona przez Usługodawcę, udostępniana w wersji mobilnej oraz webowej, służąca do śledzenia cyklu, nawyków oraz wsparcia dobrostanu kobiet.",
            "- **Konto** – osobiste konto zakładane przez Użytkownika w aplikacji, umożliwiające dostęp do usług świadczonych przez Usługodawcę.",
            "- **Materiały** – wszelkie opracowania, treści, zdjęcia i informacje zamieszczane w aplikacji, w tym plany nawyków, przepisy i treści edukacyjne.",
            "- **Użytkownik** – każda osoba fizyczna korzystająca z Aplikacji zgodnie z jej przeznaczeniem.",
        ].join("\n"),
    },
    {
        id: "regulamin-2",
        order: 20,
        title: "§2 Zakres przedmiotowy regulaminu",
        body: [
            "Regulamin określa ogólne zasady i warunki korzystania z aplikacji OH! Club, a w szczególności:",
            "",
            "- warunki świadczenia usług drogą elektroniczną;",
            "- standardy techniczne niezbędne do korzystania z usług;",
            "- zasady zawierania i rozwiązywania umów;",
            "- rodzaje dostępnych funkcjonalności i treści;",
            "- składanie i rozpatrywanie reklamacji.",
        ].join("\n"),
    },
    {
        id: "regulamin-3",
        order: 30,
        title: "§3 Zakres usług i wymagania techniczne",
        body: [
            "Aplikacja OH! Club oferuje następujące funkcjonalności:",
            "",
            "- monitorowanie cyklu menstruacyjnego i prognozowanie faz;",
            "- dostęp do planów budowania nawyków i programów tematycznych;",
            "- dziennik nastroju i objawów;",
            "- treści edukacyjne i artykuły eksperckie;",
            "- fotodzienniczek i analizę postępów.",
            "",
            "Wymagania techniczne: system iOS w wersji 15.0 lub nowszej, system Android w wersji 8.0 lub nowszej, aktywne połączenie z Internetem.",
        ].join("\n"),
    },
    {
        id: "regulamin-4",
        order: 40,
        title: "§4 Warunki korzystania",
        body: [
            "1. Usługi oferowane przez Usługodawcę nie stanowią świadczeń zdrowotnych ani porad lekarskich. Nie mogą być podstawą do podejmowania bądź zaniechania leczenia bez konsultacji z lekarzem specjalistą.",
            "",
            "2. Użytkownik jest odpowiedzialny za zachowanie poufności swoich danych logowania.",
            "",
            "3. Zakazane jest dostarczanie przez Użytkownika treści o charakterze bezprawnym, obraźliwym lub naruszającym dobra osób trzecich.",
        ].join("\n"),
    },
    {
        id: "regulamin-5",
        order: 50,
        title: "§5 Reklamacje i odstąpienie",
        body: [
            `1. Wszelkie reklamacje dotyczące działania Serwisu mogą być zgłaszane drogą elektroniczną na adres: ${SITE.contactEmail}.`,
            "",
            "2. Usługodawca rozpatruje reklamacje w terminie 14 dni od ich otrzymania.",
            "",
            "3. Użytkownik będący Konsumentem ma prawo do odstąpienia od umowy w terminie 14 dni, chyba że rozpoczęto świadczenie usług cyfrowych za jego wyraźną zgodą przed upływem tego terminu.",
        ].join("\n"),
    },
    {
        // SZKIC — SPEC-konsultacje.md §12a. Wymaga przeglądu prawnika przed realnym
        // uruchomieniem sprzedaży konsultacji (szczególnie pkt 4).
        id: "regulamin-6",
        order: 60,
        title: "§6 Zakup i realizacja konsultacji",
        body: [
            "1. Umowa o świadczenie usługi konsultacji zawierana jest z chwilą zaksięgowania płatności.",
            "",
            "2. Termin konsultacji Klient ustala samodzielnie za pośrednictwem zewnętrznego systemu rezerwacji (Calendly) wskazanego po dokonaniu płatności.",
            "",
            "3. Klientowi przysługuje prawo do zmiany terminu (do 24h przed rozpoczęciem konsultacji) na zasadach systemu rezerwacji. Brak stawiennictwa na umówiony termin bez uprzedniej zmiany terminu jest równoznaczny z wykonaniem usługi i nie uprawnia do zwrotu płatności.",
            "",
            `4. W przypadku opłaconej, a nieumówionej konsultacji, zwrot płatności możliwy jest na indywidualny wniosek Klienta zgłoszony na adres ${SITE.contactEmail} w terminie 30 dni od daty zakupu.`,
            "",
            "5. Wyrażając zgodę, o której mowa w oświadczeniu składanym przy płatności, Klient traci prawo odstąpienia od umowy z chwilą pełnego wykonania usługi (art. 38 pkt 1 ustawy z dnia 30 maja 2014 r. o prawach konsumenta).",
        ].join("\n"),
    },
    {
        id: "polityka-wstep",
        order: 100,
        title: "Polityka prywatności",
        body: "W OH! Club szanujemy Twoją prywatność i dbamy o bezpieczeństwo Twoich danych. Poniższa część wyjaśnia, jakie dane zbieramy, w jakim celu je przetwarzamy oraz jakie przysługują Ci prawa w związku z korzystaniem z naszej aplikacji wellness.",
    },
    {
        id: "polityka-administrator",
        order: 110,
        title: "Administrator danych",
        body: `Administratorem danych osobowych jest **${SITE.company}** z siedzibą w ${SITE.address}, NIP: ${SITE.nip}. Kontakt we wszystkich sprawach związanych z danymi: ${SITE.contactEmail}.`,
    },
    {
        id: "polityka-kategorie",
        order: 120,
        title: "Kategorie przetwarzanych danych",
        body: [
            "Zbieramy tylko te dane, które są niezbędne do prawidłowego świadczenia usług:",
            "",
            "- **Dane identyfikacyjne:** adres e-mail, UID (logowanie przez Google Sign-In lub e-mail).",
            "- **Dane biometryczne i fizyczne:** wiek, waga, wzrost (niezbędne do wyliczenia BMR/TDEE). **Te dane przechowywane są wyłącznie lokalnie na Twoim urządzeniu i nie są wysyłane do chmury.** Wyliczenia BMR/TDEE wykonywane są bezpośrednio na urządzeniu.",
            "- **Dane o cyklu menstruacyjnym:** data ostatniej miesiączki i długość cyklu, synchronizowane z chmurą wyłącznie po to, by plan był spójny między Twoimi urządzeniami. **Szczegółowa historia dat poszczególnych miesiączek przechowywana jest wyłącznie lokalnie na Twoim urządzeniu i nie jest wysyłana do chmury.**",
            "- **Poziom aktywności i cele sylwetkowe:** wykorzystywane do wyliczenia zapotrzebowania kalorycznego i doboru planu.",
            "- **Dane o aktywności:** liczba kroków oraz statystyki aktywności pobierane z czujników urządzenia.",
            "- **Dane dla użytkowniczek Premium/Platinum:** w przypadku korzystania z płatnych pakietów przetwarzamy również dane kontaktowe oraz adresowe niezbędne do realizacji usług dodatkowych.",
        ].join("\n"),
    },
    {
        id: "polityka-podstawa",
        order: 130,
        title: "Cel i podstawa prawna przetwarzania",
        body: [
            "- **Wykonanie usługi (art. 6 ust. 1 lit. b RODO):** obsługa konta, generowanie planów oraz realizacja usług premium/platinum.",
            "- **Zgoda (art. 9 ust. 2 lit. a RODO):** analiza i prognozowanie faz cyklu menstruacyjnego.",
            "- **Prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO):** cele analityczne, optymalizacja aplikacji i zapewnienie bezpieczeństwa.",
        ].join("\n"),
    },
    {
        id: "polityka-odbiorcy",
        order: 140,
        title: "Odbiorcy danych i udostępnianie",
        body: [
            "Twoje dane są bezpiecznie przechowywane w chmurze Firebase. Ponadto:",
            "",
            "- **Partnerzy biznesowi:** dane użytkowniczek pakietów Premium oraz Platinum (takie jak adres i dane kontaktowe) są udostępniane naszym zaufanym partnerom (np. **Balancea**) wyłącznie w celu prawidłowej realizacji wykupionych usług dodatkowych.",
            "- **Dostawcy techniczni:** Google (Firebase) w zakresie utrzymania infrastruktury i autentykacji.",
            "- **Zakup konsultacji:** jeśli kupujesz płatną konsultację, Twój adres e-mail i kwotę zamówienia przekazujemy: **Stripe** (obsługa płatności), **Fakturownia** (wystawienie i wysyłka faktury, w tym przekazanie do Krajowego Systemu e-Faktur) oraz **Resend** (wysyłka e-maila z potwierdzeniem i linkiem do rezerwacji terminu). Rezerwacja terminu odbywa się w **Calendly** (przekazujemy tam jedynie Twój adres e-mail w celu wstępnego wypełnienia formularza).",
        ].join("\n"),
    },
    {
        id: "polityka-prawa",
        order: 150,
        title: "Prawa użytkowniczki",
        body: [
            "Posiadasz pełną kontrolę nad swoimi danymi. Masz prawo do:",
            "",
            "- dostępu do swoich danych oraz ich sprostowania;",
            "- usunięcia danych (tzw. prawo do bycia zapomnianym);",
            "- przenoszenia danych oraz wycofania zgody w dowolnym momencie.",
            "",
            "Z poziomu aplikacji w każdej chwili możesz trwale usunąć swoje konto wraz ze wszystkimi powiązanymi danymi.",
        ].join("\n"),
    },
    {
        id: "polityka-bezpieczenstwo",
        order: 160,
        title: "Bezpieczeństwo",
        body: "Dane profilu, nawyki, dieta, przeczytane artykuły oraz Twoje zgody są przechowywane w chmurze Firebase i szyfrowane w tranzycie (HTTPS/TLS). Wyniki pomiarów biometrycznych i szczegółowa historia cyklu nigdy nie opuszczają Twojego urządzenia. Nie udostępniamy danych osobom trzecim poza odbiorcami wymienionymi w sekcji o odbiorcach danych i udostępnianiu (m.in. Google/Firebase, a przy zakupie konsultacji także Stripe, Fakturownia, Resend i Calendly).",
    },
    {
        id: "polityka-kontakt",
        order: 170,
        title: "Kontakt",
        body: `W sprawach dotyczących prywatności lub realizacji Twoich praw prosimy o kontakt pod adresem: ${SITE.contactEmail}.`,
    },
];

/**
 * Sekcje regulaminu i polityki prywatności z CMS (kolekcja `privacy_sections`),
 * z pełnym fallbackiem w kodzie. Nie rzuca wyjątkiem — na błąd/timeout zwraca
 * `DEFAULT_PRIVACY_SECTIONS` (jak `getCreators` w lib/strapi.ts).
 *
 * ISR: `revalidate` 300 s — zmiana redakcyjna w CMS pojawia się bez redeploya
 * (wzorzec staleTime z aplikacji mobilnej).
 */
export async function getPrivacySections(): Promise<PrivacySection[]> {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/privacy-sections?sort=order:asc&pagination[pageSize]=100`,
            {
                headers: STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {},
                next: { revalidate: 300 },
            },
        );

        if (!res.ok) {
            // 403/404 to zwykle brak/nieprawidłowy token albo brak dostępu do kolekcji
            // w ustawieniach Strapi — stan oczekiwany do skonfigurowania, nie wyjątek.
            console.warn(`[Strapi] Privacy sections fetch nie-OK: ${res.status}`);
            return DEFAULT_PRIVACY_SECTIONS;
        }

        const json = await res.json();
        const entries: StrapiPrivacySectionEntry[] = json?.data ?? [];

        const mapped = entries
            .filter((e) => typeof e.title === "string" && typeof e.body === "string" && e.title.trim() && e.body.trim())
            .map((e, i) => ({
                id: String(e.documentId ?? e.id ?? i),
                title: (e.title as string).trim(),
                body: e.body as string,
                order: typeof e.order === "number" ? e.order : i,
                updatedAt: typeof e.updatedAt === "string" ? e.updatedAt : undefined,
            }))
            .sort((a, b) => a.order - b.order);

        return mapped.length ? mapped : DEFAULT_PRIVACY_SECTIONS;
    } catch (error) {
        console.error("[Strapi] Privacy sections fetch error:", error);
        return DEFAULT_PRIVACY_SECTIONS;
    }
}

/** Sformatowana data ostatniej aktualizacji: max(updatedAt) z CMS lub stała fallbacku. */
export function resolveLastUpdated(sections: PrivacySection[]): string {
    const stamps = sections
        .map((s) => s.updatedAt)
        .filter((v): v is string => typeof v === "string");

    if (stamps.length === 0) return LEGAL_FALLBACK_LAST_UPDATED;

    const newest = stamps.reduce((a, b) => (a > b ? a : b));
    const d = new Date(newest);
    if (Number.isNaN(d.getTime())) return LEGAL_FALLBACK_LAST_UPDATED;

    return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }) + " r.";
}
