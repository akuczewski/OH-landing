import type { Metadata } from "next";
import { Suspense } from "react";
import ConsultationCheckoutForm from "@/components/ConsultationCheckoutForm";
import Eyebrow from "@/components/Eyebrow";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getExperts } from "@/lib/consultations";

export const metadata: Metadata = {
    title: "Konsultacje online",
    description: "Umów płatną konsultację online z ekspertem OH! Club: dietetykiem lub kosmetologiem.",
};

export default async function KonsultacjePage() {
    const experts = await getExperts();

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-[70vh]">
                <div className="text-center mb-12 max-w-xl mx-auto">
                    <Eyebrow>Konsultacje</Eyebrow>
                    <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-bold mt-5 mb-5 leading-tight">
                        Porozmawiaj z ekspertem OH! Club
                    </h1>
                    <p className="text-lg text-text-dark/70 leading-relaxed">
                        Indywidualna konsultacja online. Wybierz eksperta i zapłać, a potem
                        samodzielnie umówisz dogodny termin.
                    </p>
                </div>

                {experts.length === 0 ? (
                    <div className="bg-white p-10 rounded-[2rem] shadow-card text-center border-2 border-primary-green/15">
                        <p className="text-text-dark/70">
                            Konsultacje będą wkrótce dostępne. Zajrzyj tu za chwilę.
                        </p>
                    </div>
                ) : (
                    <Suspense fallback={null}>
                        <ConsultationCheckoutForm experts={experts} />
                    </Suspense>
                )}
            </main>
            <Footer />
        </div>
    );
}
