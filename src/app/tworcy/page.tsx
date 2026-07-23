import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CreatorCard from "@/components/CreatorCard";
import { getCreatorSocials } from "@/lib/creatorSocials";
import { getCreators } from "@/lib/strapi";

export const metadata: Metadata = {
    title: "Twórcy treści",
    description: "Poznaj ekspertki tworzące treści w OH! Club: dietetyczkę, kosmetolożkę i trenerki, które dzielą się wiedzą i doświadczeniem.",
};

export default async function ContentCreators() {
    const creators = await getCreators();

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h1 className="font-serif text-5xl text-primary-green mb-6">Twórcy treści</h1>
                    <p className="text-lg text-text-dark/80">
                        Wiedza w OH! Club powstaje wspólnie z ekspertkami, które łączą doświadczenie
                        zawodowe z prawdziwym zrozumieniem potrzeb kobiet.
                    </p>
                </div>

                {creators.length === 0 ? (
                    <div className="bg-white p-12 rounded-[2.5rem] shadow-card text-center max-w-xl mx-auto border-2 border-primary-green/20">
                        <p className="text-text-dark/70">
                            Wkrótce przedstawimy tutaj nasz zespół ekspertek.
                        </p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {creators.map((creator) => (
                            <CreatorCard key={creator.id} creator={creator} socials={getCreatorSocials(creator.name)} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
