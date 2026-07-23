export const COOKIE_CONSENT_KEY = "oh-cookie-consent";
export const COOKIE_CONSENT_EVENT = "oh-cookie-consent-change";
export type CookieConsentValue = "accepted" | "rejected";

export function subscribeToConsent(callback: () => void) {
    window.addEventListener(COOKIE_CONSENT_EVENT, callback);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
}

export function getConsentSnapshot() {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
}

// Brak decyzji jest bezpiecznym domyślnym stanem podczas SSR — patrz komentarz w CookieConsent.tsx.
export function getConsentServerSnapshot() {
    return null;
}
