import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function CookiesPolicy() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Polityka Cookies</h1>
                <div className="prose prose-lg text-text-dark/80 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <p className="text-sm text-text-dark/50 mb-8">Ostatnia aktualizacja: [Data]</p>

                    <h2>Czym są pliki cookies?</h2>
                    <p>Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu końcowym Użytkownika, wykorzystywane przez Serwis w celach dostosowania treści, uwierzytelniania i prowadzenia anonimowych statystyk.</p>

                    <h2>Wykorzystywane cookies</h2>
                    <p>Nasz serwis oraz serwisy zewnętrzne (np. analityka) wykorzystują niezbędne oraz funkcjonalne pliki ciasteczek.</p>

                    <div className="p-4 bg-accent-pink/20 rounded-xl mt-8">
                        <p className="text-sm m-0 italic">Strona znajduje się w przygotowaniu. Pełen tekst polityki cookies zostanie udostępniony przed startem.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
