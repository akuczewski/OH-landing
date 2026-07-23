const items = [
    "DOSTĘPNE NA IOS I ANDROIDA",
    "TWOJE DANE ZOSTAJĄ NA TWOIM TELEFONIE",
    "POBIERZ I ZACZNIJ JUŻ DZIŚ",
    "STWORZONE Z EKSPERTKAMI",
];

function Track() {
    return (
        <div className="flex items-center shrink-0">
            {items.map((item, i) => (
                <span key={i} className="flex items-center">
                    <span className="font-serif text-lg md:text-xl text-cream/90 tracking-wide px-6 whitespace-nowrap">
                        {item}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-pink shrink-0" />
                </span>
            ))}
        </div>
    );
}

/**
 * Pasek social-proof w pętli — czysta animacja CSS (marquee-scroll w globals.css),
 * nigdy nie zależy od JS. Respektuje prefers-reduced-motion (zatrzymuje przewijanie).
 */
export default function MarqueeTicker() {
    return (
        <div className="bg-primary-green py-5 overflow-hidden" aria-hidden="true">
            <div className="flex marquee-track w-max">
                <Track />
                <Track />
            </div>
        </div>
    );
}
