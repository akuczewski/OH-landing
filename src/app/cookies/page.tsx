import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function CookiesPolicy() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#4A4238] font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <header className="mb-12">
                    <h1 className="font-playfair text-4xl md:text-5xl text-primary-green mb-4">Polityka Cookies</h1>
                    <p className="text-sm text-text-dark/50 italic">Ostatnia aktualizacja: 27 kwietnia 2026 r.</p>
                </header>

                <div className="prose prose-stone max-w-none bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-stone-100">
                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">1. Czym są pliki cookies?</h2>
                        <p className="text-stone-600 leading-relaxed">
                            Pliki cookies (tzw. „ciasteczka”) to dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu (np. komputerze, smartfonie, tablecie) i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">2. W jakim celu używamy plików cookies?</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed">
                            <p>Serwis OH! Club wykorzystuje pliki cookies w celu:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Niezbędnym:</strong> Zapewnienia prawidłowego działania podstawowych funkcji serwisu, takich jak logowanie, nawigacja i bezpieczeństwo. Bez tych plików serwis nie może działać poprawnie.</li>
                                <li><strong>Analitycznym:</strong> Zrozumienia, w jaki sposób Użytkownicy korzystają z serwisu, co pozwala nam na ciągłe ulepszanie jego struktury i zawartości (np. poprzez narzędzie Google Analytics).</li>
                                <li><strong>Funkcjonalnym:</strong> Zapamiętania wybranych przez Użytkownika ustawień i personalizacji interfejsu (np. preferowany język czy motyw).</li>
                                <li><strong>Marketingowym:</strong> Dopasowania treści reklamowych do zainteresowań Użytkownika oraz mierzenia skuteczności kampanii promocyjnych.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">3. Zarządzanie plikami cookies</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed">
                            <p>
                                Większość przeglądarek internetowych domyślnie dopuszcza przechowywanie plików cookies. Użytkownik ma jednak możliwość w każdej chwili zmienić te ustawienia.
                            </p>
                            <p>
                                Ograniczenie stosowania plików cookies może wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu lub całkowicie uniemożliwić korzystanie z niektórych opcji (np. automatycznego logowania).
                            </p>
                            <p>
                                Instrukcje dotyczące blokowania lub usuwania cookies można znaleźć w menu pomocy każdej przeglądarki (np. Chrome, Firefox, Safari, Edge).
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">4. Zmiany w polityce cookies</h2>
                        <p className="text-stone-600 leading-relaxed">
                            Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Cookies. Wszelkie zmiany będą publikowane na tej podstronie wraz z datą ostatniej aktualizacji.
                        </p>
                    </section>

                    <div className="mt-12 pt-8 border-t border-stone-100 text-center">
                        <p className="text-stone-400 text-sm">
                            W razie pytań dotyczących plików cookies, prosimy o kontakt pod adresem: hello@ohclub.app.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
