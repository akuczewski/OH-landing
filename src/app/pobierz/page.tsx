import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Download() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh] text-center flex flex-col items-center justify-center">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Pobierz aplikację</h1>
                <p className="text-lg text-text-dark/80 mb-12 max-w-xl">Dołącz do OH! Club i rozpocznij swoją podróż ku lepszemu zrozumieniu własnego organizmu.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <button className="bg-text-dark text-cream px-8 py-4 rounded-full text-lg font-bold shadow-soft hover:shadow-card transform hover:-translate-y-1 transition-all">
                        App Store (Wkrótce)
                    </button>
                    <button className="bg-text-dark text-cream px-8 py-4 rounded-full text-lg font-bold shadow-soft hover:shadow-card transform hover:-translate-y-1 transition-all">
                        Google Play (Wkrótce)
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
