import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HomeMotion from "@/components/nowy/HomeMotion";
import ModernMarquee from "@/components/nowy/ModernMarquee";
import { ClosingSection, ExpertsSection, FaqSection, FounderSection, TestimonialsSection } from "@/components/nowy/BottomSections";
import { CareSection, CompareSection, InsideSection, PlansSection } from "@/components/nowy/MiddleSections";
import { HeroSection, HowItWorksSection, SignalsSection, SolutionSection } from "@/components/nowy/TopSections";
import { getConsultationOffer } from "@/lib/consultationOffer";
import { getCreators, getFaqItems } from "@/lib/strapi";

// Strona główna wg makiety "OH! Club nowy landing" (strony 1-9). Tytuł i opis z layout.tsx.
export const revalidate = 3600;

const APP_PHOTO = "/nowy-landing/klaudia-aplikacja.jpg";

export default async function Home() {
    const [creators, consultation, faq] = await Promise.all([getCreators(), getConsultationOffer(), getFaqItems()]);
    const klaudia = creators.find((c) => c.name.toLowerCase().includes("klaudia"));
    const cosmetologist = creators.find((c) => /^kosmetolog/i.test(c.role.trim()));

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            {/* Przed treścią: włącz ukrywanie animowanych elementów tylko przy JS i bez "ogranicz ruch". */}
            <script
                dangerouslySetInnerHTML={{
                    __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')",
                }}
            />
            <HomeMotion />
            <Navbar />
            <main>
                <HeroSection klaudiaPhoto={klaudia?.imageUrl ?? APP_PHOTO} />
                <ModernMarquee />
                <SignalsSection />
                <SolutionSection />
                <HowItWorksSection />
                <InsideSection />
                <CareSection
                    people={[
                        { title: "Dietetyk kliniczny", sub: "Wyniki badań, plan żywienia, suplementacja.", photo: klaudia?.imageUrl ?? APP_PHOTO },
                        {
                            title: cosmetologist ? `Kosmetolog ${cosmetologist.name}` : "Kosmetolog",
                            sub: "Pielęgnacja dopasowana do Twojej skóry.",
                            photo: cosmetologist?.imageUrl ?? null,
                        },
                    ]}
                />
                <CompareSection />
                <PlansSection consultation={consultation} />
                <TestimonialsSection />
                <FounderSection photo={APP_PHOTO} />
                <ExpertsSection
                    experts={creators.map((c) => ({ name: c.name, role: c.role, photo: c.imageUrl, fit: c.imageFit, align: c.imageAlign }))}
                />
                <FaqSection items={faq} />
                <ClosingSection klaudiaPhoto={APP_PHOTO} />
            </main>
            <div className="-mt-20">
                <Footer />
            </div>
        </div>
    );
}
