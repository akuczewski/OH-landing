import Image from "next/image";
import { expertHeading, initials, type Expert } from "@/lib/consultationFormat";

const TONE_BG = {
    sage: "bg-secondary-green/20 text-primary-green",
    blush: "bg-accent-pink/35 text-accent-pink-deep",
} as const;

/**
 * Zdjęcie eksperta wypełniające rodzica (rodzic ustala proporcje i zaokrąglenie).
 * Bez zdjęcia: kafel blush/sage z inicjałami (SPEC-new-consultations §4).
 */
export default function ExpertPhoto({
    expert,
    tone,
    sizes,
    priority = false,
}: {
    expert: Pick<Expert, "name" | "displayName" | "title" | "photoUrl">;
    tone: "sage" | "blush";
    sizes: string;
    priority?: boolean;
}) {
    const label = expertHeading(expert);
    return (
        <div className={`relative w-full h-full flex items-center justify-center ${TONE_BG[tone]}`}>
            {expert.photoUrl ? (
                <Image
                    src={expert.photoUrl}
                    alt={label}
                    fill
                    sizes={sizes}
                    priority={priority}
                    className="object-cover object-top"
                />
            ) : (
                <span className="font-serif text-5xl font-bold opacity-80" aria-hidden="true">
                    {initials(label)}
                </span>
            )}
        </div>
    );
}
