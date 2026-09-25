import type { Metadata } from "next";
import { Suspense } from "react";
import ConsultationThankYou from "@/components/ConsultationThankYou";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Dziękujemy za zakup konsultacji",
    robots: { index: false, follow: false },
};

export default async function DziekujemyPage({
    searchParams,
}: {
    searchParams: Promise<{ orderId?: string }>;
}) {
    const { orderId } = await searchParams;

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-24 px-6 max-w-2xl mx-auto min-h-[70vh]">
                <Suspense fallback={null}>
                    <ConsultationThankYou orderId={orderId ?? null} />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
