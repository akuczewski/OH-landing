import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Testimonials() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Opinie użytkowniczek</h1>
                <p className="text-lg text-text-dark/80 mb-12">Zobacz, jak OH! Club zmienił podejście do zdrowia i codziennych rytuałów naszych użytkowniczek.</p>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm">
                        <p className="italic text-text-dark/70 mb-4">"Aplikacja w końcu pozwoliła mi zrozumieć moje spadki energii i odpowiednio dobrać jadłospis!"</p>
                        <p className="font-bold text-primary-green">- Ania</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm">
                        <p className="italic text-text-dark/70 mb-4">"Zintegrowany timer i care rituals to game changer. Mam wszystko w jednym miejscu."</p>
                        <p className="font-bold text-primary-green">- Kasia</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
