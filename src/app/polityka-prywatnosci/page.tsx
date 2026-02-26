import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Polityka Prywatności</h1>
                <div className="prose prose-lg text-text-dark/80 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <p className="text-sm text-text-dark/50 mb-8">Ostatnia aktualizacja: [Data]</p>

                    <h2>1. Administrator Danych</h2>
                    <p>Administratorem Twoich danych osobowych przekazywanych w ramach aplikacji i serwisu jest [Nazwa firmy/spółki]...</p>

                    <h2>2. Cel przetwarzania danych</h2>
                    <p>Przetwarzamy Twoje dane w celu personalizacji treści (dostosowanie diety i treningu do cyklu), analizy błędów i w celach analitycznych.</p>

                    <div className="p-4 bg-accent-pink/20 rounded-xl mt-8">
                        <p className="text-sm m-0 italic">Strona znajduje się w przygotowaniu. Pełen tekst polityki prywatności zostanie udostępniony przed publicznym startem aplikacji.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
