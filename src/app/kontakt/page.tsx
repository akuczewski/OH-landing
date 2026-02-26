import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Contact() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Kontakt</h1>
                <p className="text-lg text-text-dark/80 mb-12">Masz pytania lub sugestie? Skontaktuj się z nami!</p>

                <div className="bg-white p-8 rounded-3xl shadow-sm max-w-2xl">
                    <p className="font-bold text-xl mb-2">E-mail</p>
                    <a href="mailto:kontakt@ohclub.pl" className="text-primary-green hover:underline">kontakt@ohclub.pl</a>

                    <p className="font-bold text-xl mb-2 mt-8">Social Media</p>
                    <p className="text-text-dark/70">Odwiedź nasze profile na Instagramie i TikToku, aby być na bieżąco!</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
