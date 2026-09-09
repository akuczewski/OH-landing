import CreatorCard from "@/components/CreatorCard";
import Eyebrow from "@/components/Eyebrow";
import ScrollReveal from "@/components/ScrollReveal";
import { getCreatorSocials } from "@/lib/creatorSocials";
import type { Creator } from "@/lib/strapi";

export default function ExpertsSection({ creators }: { creators: Creator[] }) {
    if (creators.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-light-cream">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal>
                    <Eyebrow>Zespół</Eyebrow>
                </ScrollReveal>
                <ScrollReveal variant="wipe" stagger={80}>
                    <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold leading-[1.15] tracking-tight mt-5 mb-5">
                        Poznaj ekspertów OH! Club
                    </h2>
                </ScrollReveal>
                <ScrollReveal stagger={160}>
                    <p className="text-lg text-text-dark/75 leading-relaxed max-w-3xl mb-12">
                        Za planami, treningami, przepisami i rytuałami w OH! Club stoi zespół
                        specjalistów, którzy przekładają swoją wiedzę i doświadczenie na proste
                        rozwiązania dopasowane do prawdziwego życia kobiet.
                    </p>
                </ScrollReveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {creators.map((creator, i) => (
                        <ScrollReveal key={creator.id} stagger={i * 80} className="h-full">
                            <CreatorCard creator={creator} socials={getCreatorSocials(creator.name)} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
