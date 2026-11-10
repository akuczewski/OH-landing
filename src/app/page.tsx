import Footer from "@/components/Footer";
import MarqueeTicker from "@/components/MarqueeTicker";
import Navbar from "@/components/Navbar";
import { ClosingSection, ExpertsSection, FaqSection, FounderSection, TestimonialsSection } from "@/components/nowy/BottomSections";
import { CareSection, CompareSection, InsideSection, PlansSection } from "@/components/nowy/MiddleSections";
import { HeroSection, HowItWorksSection, SignalsSection, SolutionSection } from "@/components/nowy/TopSections";
import { CARE_DISCOUNT_PERCENT, discountedGrosze, formatPrice } from "@/lib/consultationFormat";
import { getExperts } from "@/lib/consultations";
import { getCreators } from "@/lib/strapi";

// Strona główna wg makiety "OH! Club nowy landing" (strony 1-9). Tytuł i opis z layout.tsx.
export const revalidate = 3600;

const APP_PHOTO = "/nowy-landing/klaudia-aplikacja.jpg";

export default async function Home() {
    const [creators, experts] = await Promise.all([getCreators(), getExperts().catch(() => [])]);
    const klaudia = creators.find((c) => c.name.toLowerCase().includes("klaudia"));
    const cosmetologist = creators.find((c) => /^kosmetolog/i.test(c.role.trim()));
    const consultationExpert = experts.find((e) => /klaudia/i.test(e.displayName)) ?? experts[0];

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main>
                <HeroSection klaudiaPhoto={klaudia?.imageUrl ?? APP_PHOTO} />
                <MarqueeTicker />
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
                <PlansSection
                    consultation={
                        consultationExpert
                            ? {
                                  priceLabel: formatPrice(consultationExpert.priceGrosze),
                                  carePriceLabel: formatPrice(discountedGrosze(consultationExpert.priceGrosze, CARE_DISCOUNT_PERCENT)),
                                  durationMinutes: consultationExpert.durationMinutes,
                              }
                            : null
                    }
                />
                <TestimonialsSection />
                <FounderSection photo={APP_PHOTO} />
                <ExpertsSection
                    experts={creators.map((c) => ({ name: c.name, role: c.role, photo: c.imageUrl, fit: c.imageFit, align: c.imageAlign }))}
                />
                <FaqSection />
                <ClosingSection klaudiaPhoto={APP_PHOTO} />
            </main>
            <div className="-mt-20">
                <Footer />
            </div>
        </div>
    );
}
