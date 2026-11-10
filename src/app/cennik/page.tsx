import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PlansSection } from "@/components/nowy/MiddleSections";
import { getConsultationOffer } from "@/lib/consultationOffer";

export const metadata: Metadata = {
    title: "Cennik",
    description: "Plany OH! Club i OH! Club Care oraz cena konsultacji online. 7 dni za darmo.",
};

export const revalidate = 3600;

// Ten sam cennik co na stronie głównej (PlansSection): aplikacja + konsultacja z ceną z CMS.
export default async function Pricing() {
    const consultation = await getConsultationOffer();
    return (
        <div className="min-h-screen bg-light-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-16 min-h-[70vh]">
                <PlansSection consultation={consultation} headingAs="h1" />
            </main>
            <div className="-mt-20">
                <Footer />
            </div>
        </div>
    );
}
