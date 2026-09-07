import CreatorCard from "@/components/CreatorCard";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import { getCreatorSocials } from "@/lib/creatorSocials";
import type { Creator } from "@/lib/strapi";

export default function ExpertsSection({ creators }: { creators: Creator[] }) {
    if (creators.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-light-cream">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <Eyebrow>Zespół</Eyebrow>
                    <h2 className="font-serif text-3xl md:text-[2.75rem] text-primary-green font-bold leading-[1.15] tracking-tight mt-5 mb-5">
                        Poznaj ekspertów OH! Club
                    </h2>
                    <p className="text-lg text-text-dark/75 leading-relaxed max-w-3xl mb-12">
                        Za planami, treningami, przepisami i rytuałami w OH! Club stoi zespół
                        specjalistów, którzy przekładają swoją wiedzę i doświadczenie na proste
                        rozwiązania dopasowane do prawdziwego życia kobiet.
                    </p>
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {creators.map((creator) => (
                        <CreatorCard
                            key={creator.id}
                            creator={creator}
                            socials={getCreatorSocials(creator.name)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
