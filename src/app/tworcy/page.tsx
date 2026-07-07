import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getCreators } from "@/lib/strapi";

export const metadata: Metadata = {
    title: "Twórcy treści",
    description: "Poznaj ekspertki tworzące treści w OH! Club — dietetyczkę, kosmetolożkę i trenerki, które dzielą się wiedzą i doświadczeniem.",
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
                    <div className="grid md:grid-cols-2 gap-8">
                        {creators.map((creator) => (
                            <div key={creator.id} className="bg-white rounded-[2rem] shadow-card p-6 flex gap-5">
                                <div
                                    className="w-24 h-24 rounded-2xl shrink-0 overflow-hidden flex items-center justify-center"
                                    style={{ backgroundColor: creator.avatarBg }}
                                >
                                    {creator.imageUrl ? (
                                        <Image
                                            src={creator.imageUrl}
                                            alt={creator.name}
                                            width={96}
                                            height={96}
                                            className={`w-full h-full ${creator.imageFit === "contain" ? "object-contain" : "object-cover"} ${creator.imageAlign === "top" ? "object-top" : "object-center"}`}
                                        />
                                    ) : (
                                        <span className="font-serif text-3xl text-primary-green">
                                            {creator.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="font-serif text-xl text-primary-green font-bold">{creator.name}</h2>
                                    <p className="text-sm text-text-dark/50 font-semibold mb-2">{creator.role}</p>
                                    <p className="text-sm text-text-dark/70 leading-relaxed line-clamp-5 whitespace-pre-line">
                                        {creator.bio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
