import { SITE } from "@/lib/site";

const links = [
    { key: "instagram", label: "IG", href: SITE.socials.instagram },
    { key: "facebook", label: "FB", href: SITE.socials.facebook },
    { key: "tiktok", label: "TT", href: SITE.socials.tiktok },
] as const;

/**
 * Ikony social media — jedno źródło (SITE.socials), używane w Footer i na /kontakt.
 * `variant="dark"` dla ciemnego tła (stopka), `variant="light"` dla jasnych sekcji.
 */
export default function SocialLinks({
    variant = "dark",
    className = "",
}: {
    variant?: "dark" | "light";
    className?: string;
}) {
    const styles =
        variant === "dark"
            ? "bg-light-cream/10 text-light-cream hover:bg-accent-pink hover:text-primary-green"
            : "bg-primary-green/5 text-primary-green hover:bg-accent-pink hover:text-primary-green";

    return (
        <div className={`flex gap-4 ${className}`}>
            {links.map((l) => (
                <a
                    key={l.key}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${styles}`}
                >
                    {l.label}
                </a>
            ))}
        </div>
    );
}
