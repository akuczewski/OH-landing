import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import CampaignHero from "@/components/campaign/CampaignHero";
import ExpertsSection from "@/components/campaign/ExpertsSection";
import NutritionSection from "@/components/campaign/NutritionSection";
import PathsSection from "@/components/campaign/PathsSection";
import PricingBlock from "@/components/campaign/PricingBlock";
import { getCreators } from "@/lib/strapi";

export const metadata: Metadata = {
    title: "Jedzenie, które wspiera zdrowie hormonalne",
    description:
        "Autorskie przepisy i gotowe jadłospisy opracowane przez dietetyczkę kliniczną. Dołącz do OH! Club.",
    robots: { index: false, follow: false },
};

export default async function StartPage() {
    const creators = await getCreators();

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main>
                <CampaignHero />
                <NutritionSection />
                <Testimonials />
                <ExpertsSection creators={creators} />
                <PathsSection />
                <PricingBlock />
            </main>
            <Footer />
        </div>
    );
}
