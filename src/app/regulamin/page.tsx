import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Terms() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Regulamin Serwisu</h1>
                <div className="prose prose-lg text-text-dark/80 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <p className="text-sm text-text-dark/50 mb-8">Ostatnia aktualizacja: [Data]</p>
                    <h2>1. Postanowienia wstępne</h2>
                    <p>Niniejszy regulamin określa zasady korzystania z aplikacji OH! Club oraz serwisu internetowego...</p>

                    <h2>2. Warunki świadczenia usług</h2>
                    <p>Świadczone usługi polegają na dostępie do treści cyfrowych obejmujących nawyki, plany treningowe, przepisy...</p>

                    <div className="p-4 bg-accent-pink/20 rounded-xl mt-8">
                        <p className="text-sm m-0 italic">Strona znajduje się w przygotowaniu. Pełen tekst regulaminu zostanie udostępniony przed publicznym startem aplikacji.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
