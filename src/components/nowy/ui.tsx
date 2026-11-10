import Link from "next/link";

// Wspólne klocki nowej strony głównej (/nowy-landing). Kolory i odstępy z tokenów globals.css.

export function Pill({ children, tone = "pink", className = "" }: { children: React.ReactNode; tone?: "pink" | "white" | "solid"; className?: string }) {
    const bg = tone === "white" ? "bg-white text-primary-green" : tone === "solid" ? "bg-accent-pink text-primary-green" : "bg-accent-pink/60 text-primary-green";
    return <span className={`inline-flex rounded-full px-3.5 py-1 text-xs md:text-sm font-semibold ${bg} ${className}`}>{children}</span>;
}

/** Część nagłówka w kursywie i drugim kolorze, jak na makiecie. */
export function Accent({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "pink" }) {
    return <em className={tone === "pink" ? "text-accent-pink" : "text-secondary-green"}>{children}</em>;
}

export function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
    );
}

export function Flower({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
            {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cx="20" cy="10" rx="7" ry="9" fill="#F4A9C4" transform={`rotate(${r} 20 20)`} />
            ))}
            <circle cx="20" cy="20" r="5" fill="#F1E6A8" />
        </svg>
    );
}

/** Telefon z prawdziwym screenem aplikacji; dół ekranu wygasza się w tło. */
export function Phone({ src, alt, size = "md", className = "" }: { src: string; alt: string; size?: "sm" | "md"; className?: string }) {
    const dims = size === "sm" ? "w-[170px] h-[350px] md:w-[200px] md:h-[410px]" : "w-[210px] h-[440px] md:w-[250px] md:h-[520px]";
    return (
        <div className={`p-2 rounded-[2.6rem] bg-text-dark shadow-2xl ring-1 ring-black/5 ${className}`}>
            <div className={`relative ${dims} rounded-[2.2rem] overflow-hidden bg-light-cream`}>
                <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-light-cream/70 to-light-cream" />
            </div>
        </div>
    );
}

export function CtaLink({ href = "/pobierz", children = "Wypróbuj za darmo", variant = "pink" }: { href?: string; children?: React.ReactNode; variant?: "pink" | "outline" }) {
    const style =
        variant === "outline"
            ? "border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-cream"
            : "bg-accent-pink text-text-dark hover:brightness-95 shadow-soft hover:shadow-card";
    return (
        <Link href={href} className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 font-bold transition-all duration-300 active:scale-[0.98] ${style}`}>
            {children}
        </Link>
    );
}
