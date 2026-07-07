// Zestaw ikon SVG (styl: currentColor, wzorowany na AppleIcon/AndroidIcon z WaitlistForm)
// zastępujących emotikony w treści landingu.

type IconProps = { className?: string };

export function MoonIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 1020.354 15.354z" />
        </svg>
    );
}

export function LeafIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 20c8 0 14-6 14-14 0-1.1-.9-2-2-2C9 4 5 10 5 18c0 .7 0 1.4 0 2z" />
            <path d="M5 20c0-5 2-9 6-12" strokeLinecap="round" />
        </svg>
    );
}

export function BowlIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M3 11h18a9 9 0 01-18 0z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 11c0-2.5 1-4.5 2-6M12 11c0-3 1-5.5 2-7" strokeLinecap="round" />
        </svg>
    );
}

export function MailCheckIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 6.5l7.5 6 2 0 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function SparkleIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M12 2l1.8 5.7L19.5 9l-5.7 1.8L12 16.5l-1.8-5.7L4.5 9l5.7-1.3L12 2zM19 15l.9 2.8L22.7 18l-2.8.9L19 21.7l-.9-2.8L15.3 18l2.8-.9L19 15z" />
        </svg>
    );
}

export function HeartIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M12 21s-7.5-4.6-10-9.1C.5 8.7 2 5 5.6 5c2 0 3.4 1.1 4.4 2.5C11 6.1 12.4 5 14.4 5 18 5 19.5 8.7 22 11.9 19.5 16.4 12 21 12 21z" />
        </svg>
    );
}
