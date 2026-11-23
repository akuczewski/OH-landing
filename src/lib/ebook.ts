// Darmowy ebook za zapis na newsletter (wspólne dla formularza i API).
// Zmiana treści zgody = nowa wersja (CONSENT_VERSION), żeby w Kit było wiadomo, na co zgodziła się osoba.

export const EBOOK_PDF_URL = "/lista-badan-hormonalnych.pdf";

export const CONSENT_VERSION = "v1-2026-11-18";

export const CONSENT_TEXT =
    "Chcę otrzymać ebook i zapisuję się na newsletter OH! Club. Wyrażam zgodę na otrzymywanie na podany adres e-mail informacji o aplikacji, poradników i ofert OH! Club. Zgodę mogę wycofać w każdej chwili, klikając link w stopce wiadomości.";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
