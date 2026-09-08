import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Prose from "@/components/Prose";
import { getPrivacySections, MEDICAL_DISCLAIMER, resolveLastUpdated } from "@/lib/legal";

// Wspólny dokument dla /regulamin i /polityka-prywatnosci — jedna treść, dwa
// wejścia (link w sklepach wskazuje na /polityka-prywatnosci). Sekcje zaczytywane
// ze Strapi (kolekcja `privacy_sections`, ta sama co w apce), z fallbackiem w kodzie.
export default async function LegalDocument() {
    const sections = await getPrivacySections();
    const lastUpdated = resolveLastUpdated(sections);

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <header className="mb-10">
                    <h1 className="font-serif text-4xl md:text-5xl text-primary-green mb-4">
                        Regulamin i polityka prywatności
                    </h1>
                    <p className="text-sm text-text-dark/50">
                        Ta sama treść, którą widzisz w aplikacji w sekcji Profil &rarr; &bdquo;Regulamin i prywatność&rdquo;.
                        Ostatnia aktualizacja: {lastUpdated}
                    </p>
                </header>

                <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-sm border border-stone-100">
                    <div className="mb-10 p-5 md:p-6 rounded-2xl bg-accent-pink/10 border border-accent-pink/20">
                        <h2 className="font-serif text-xl text-primary-green mb-3">{MEDICAL_DISCLAIMER.title}</h2>
                        <Prose>{MEDICAL_DISCLAIMER.body}</Prose>
                    </div>

                    {sections.map((s) => (
                        <section key={s.id} className="mb-9 last:mb-0">
                            <h2 className="font-serif text-2xl text-primary-green border-b border-stone-100 pb-2 mb-4">
                                {s.title}
                            </h2>
                            <Prose>{s.body}</Prose>
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
