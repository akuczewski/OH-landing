import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Eyebrow from "@/components/Eyebrow";
import { ComingSoonCard, ExpertCard, ExpertCardWide } from "@/components/ExpertCards";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { expertPath } from "@/lib/consultationFormat";
import { getExpertById, getExperts } from "@/lib/consultations";

export const metadata: Metadata = {
    title: "Konsultacje online",
    description: "Umów płatną konsultację online z ekspertem OH! Club: dietetykiem lub kosmetologiem.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

export default async function KonsultacjePage({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;

    // Zgodność wsteczna: apka ze sklepu i cancel_url ze Stripe linkują
    // /konsultacje?expertId=…&code=… → strona eksperta z rozwiniętym formularzem
    // (SPEC-new-consultations §5.2). Nieznany expertId → zwykła lista.
    const expertId = first(params.expertId);
    if (expertId) {
        const expert = await getExpertById(expertId);
        if (expert) {
            const next = new URLSearchParams({ checkout: "1" });
            const code = first(params.code);
            if (code) next.set("code", code);
            if (first(params.anulowano) === "1") next.set("anulowano", "1");
            redirect(`${expertPath(expert)}?${next.toString()}`);
        }
    }

    const experts = await getExperts();

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto min-h-[70vh]">
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <Eyebrow>Konsultacje</Eyebrow>
                    <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-bold mt-5 mb-5 leading-tight">
                        Porozmawiaj z ekspertem OH! Club
                    </h1>
                    <p className="text-lg text-text-dark/70 leading-relaxed">
                        Indywidualna konsultacja online. Wybierz specjalistę, zapoznaj się z jego profilem i
                        umów spotkanie.
                    </p>
                </div>

                {experts.length === 0 ? (
                    <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2rem] shadow-card text-center border-2 border-primary-green/15">
                        <p className="text-text-dark/70">Konsultacje będą wkrótce dostępne. Zajrzyj tu za chwilę.</p>
                    </div>
                ) : experts.length === 1 ? (
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                        <ExpertCardWide expert={experts[0]} />
                        <ComingSoonCard />
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {experts.map((expert, index) => (
                            <ExpertCard key={expert.id} expert={expert} index={index} />
                        ))}
                        {experts.length === 2 && <ComingSoonCard />}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
