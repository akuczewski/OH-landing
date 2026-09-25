import Stripe from "stripe";

// Leniwy singleton — instancja tworzona dopiero przy pierwszym użyciu w request
// handlerze (przy buildzie nie ma STRIPE_SECRET_KEY, a new Stripe("") rzuca).
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        const key = process.env.STRIPE_SECRET_KEY;
        if (!key) throw new Error("Brak STRIPE_SECRET_KEY");
        _stripe = new Stripe(key);
    }
    return _stripe;
}

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";
