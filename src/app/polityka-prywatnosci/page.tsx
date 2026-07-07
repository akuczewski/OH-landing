import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
    title: "Polityka Prywatności",
    description: "Dowiedz się, jakie dane zbiera OH! Club, w jakim celu i jak chronimy Twoją prywatność.",
};

export default function PrivacyPolicy() {
    const lastUpdate = new Date().toLocaleDateString("pl-PL");

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Polityka Prywatności</h1>
                <div className="prose prose-lg text-text-dark/80 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm max-w-none">
                    <p className="text-sm text-text-dark/50 mb-8">Ostatnia aktualizacja: {lastUpdate}</p>

                    <p>W OH! Club szanujemy Twoją prywatność i dbamy o bezpieczeństwo Twoich danych. Niniejsza Polityka Prywatności wyjaśnia, jakie dane zbieramy, w jakim celu je przetwarzamy oraz jakie przysługują Ci prawa w związku z korzystaniem z naszej aplikacji wellness.</p>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">1. Administrator Danych</h2>
                    <p>Administratorem danych osobowych jest <strong>{SITE.company}</strong> z siedzibą w {SITE.address}, NIP: {SITE.nip}. Kontakt we wszystkich sprawach związanych z danymi: {SITE.contactEmail}.</p>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">2. Kategorie Przetwarzanych Danych</h2>
                    <p>Zbieramy tylko te dane, które są niezbędne do prawidłowego świadczenia usług:</p>
                    <ul>
                        <li><strong>Dane identyfikacyjne:</strong> Adres e-mail, UID (logowanie przez Google Sign-In lub e-mail).</li>
                        <li><strong>Dane biometryczne i fizyczne:</strong> Wiek, waga, wzrost (niezbędne do wyliczenia BMR/TDEE). <strong>Te dane przechowywane są wyłącznie lokalnie na Twoim urządzeniu i nie są wysyłane do chmury</strong> — wyliczenia BMR/TDEE wykonywane są bezpośrednio na urządzeniu.</li>
                        <li><strong>Dane o cyklu menstruacyjnym:</strong> Data ostatniej miesiączki i długość cyklu — synchronizowane z chmurą wyłącznie po to, by plan był spójny między Twoimi urządzeniami. <strong>Szczegółowa historia dat poszczególnych miesiączek przechowywana jest wyłącznie lokalnie na Twoim urządzeniu i nie jest wysyłana do chmury.</strong></li>
                        <li><strong>Poziom aktywności i cele sylwetkowe:</strong> Wykorzystywane do wyliczenia zapotrzebowania kalorycznego i doboru planu.</li>
                        <li><strong>Dane o aktywności:</strong> Liczba kroków oraz statystyki aktywności pobierane z czujników urządzenia.</li>
                        <li><strong>Dane dla Użytkowników Premium/Platinum:</strong> W przypadku korzystania z płatnych pakietów, przetwarzamy również dane kontaktowe oraz adresowe niezbędne do realizacji usług dodatkowych.</li>
                    </ul>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">3. Cel i Podstawa Prawna Przetwarzania</h2>
                    <ul>
                        <li><strong>Wykonanie usługi (Art. 6 ust. 1 lit. b RODO):</strong> Obsługa konta, generowanie planów oraz realizacja usług premium/platinum.</li>
                        <li><strong>Zgoda (Art. 9 ust. 2 lit. a RODO):</strong> Analiza i prognozowanie faz cyklu menstruacyjnego.</li>
                        <li><strong>Prawnie uzasadniony interes (Art. 6 ust. 1 lit. f RODO):</strong> Cele analityczne, optymalizacja aplikacji i zapewnienie bezpieczeństwa.</li>
                    </ul>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">4. Odbiorcy Danych i Udostępnianie</h2>
                    <p>Twoje dane są bezpiecznie przechowywane w chmurze Firebase. Ponadto:</p>
                    <ul>
                        <li><strong>Partnerzy Biznesowi:</strong> Dane użytkowników pakietów Premium oraz Platinum (takie jak adres i dane kontaktowe) są udostępniane naszym zaufanym partnerom (np. <strong>Balancea</strong>) wyłącznie w celu prawidłowej realizacji wykupionych usług dodatkowych.</li>
                        <li><strong>Dostawcy Techniczni:</strong> Google (Firebase) w zakresie utrzymania infrastruktury i autentykacji.</li>
                    </ul>

                    <div className="p-6 bg-accent-pink/10 rounded-2xl my-8 border border-accent-pink/20">
                        <h2 className="text-2xl font-serif text-primary-green mt-0 mb-4">5. Ważne Zastrzeżenie Medyczne</h2>
                        <p>Aplikacja OH! Club została stworzona wyłącznie w celach wspierających zdrowy tryb życia oraz budowanie zdrowych nawyków.</p>
                        <ul>
                            <li><strong>Brak charakteru medycznego:</strong> Aplikacja nie jest wyrobem medycznym ani substytutem wizyty lub konsultacji lekarskiej.</li>
                            <li><strong>Konieczność konsultacji:</strong> Wszystkie problemy zdrowotne powinny być niezwłocznie konsultowane ze specjalistą lub lekarzem.</li>
                            <li><strong>Brak gwarancji rezultatów:</strong> Aplikacja nie gwarantuje osiągnięcia konkretnych rezultatów zdrowotnych ani poprawy stanu zdrowia. Efekty zależą od indywidualnych uwarunkowań organizmu.</li>
                            <li><strong>Obietnica zdrowotna:</strong> Korzystanie z aplikacji nie stanowi obietnicy opanowania jakichkolwiek problemów zdrowotnych lub schorzeń.</li>
                        </ul>
                    </div>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">6. Prawa Użytkownika</h2>
                    <p>Posiadasz pełną kontrolę nad swoimi danymi. Masz prawo do:</p>
                    <ul>
                        <li>Dostępu do swoich danych oraz ich sprostowania.</li>
                        <li>Usunięcia danych (&quot;Prawo do bycia zapomnianym&quot;).</li>
                        <li>Przenoszenia danych oraz wycofania zgody w dowolnym momencie.</li>
                    </ul>
                    <p>Z poziomu aplikacji w każdej chwili możesz trwale usunąć swoje konto wraz ze wszystkimi powiązanymi danymi.</p>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">7. Bezpieczeństwo</h2>
                    <p>Dane profilu, nawyki, dieta, przeczytane artykuły oraz Twoje zgody są przechowywane w chmurze Firebase i szyfrowane w tranzycie (HTTPS/TLS). Wyniki pomiarów biometrycznych i szczegółowa historia cyklu nigdy nie opuszczają Twojego urządzenia. Nie udostępniamy danych osobom trzecim poza usługami Google niezbędnymi do działania aplikacji oraz partnerami logistycznymi wskazanymi w punkcie 4.</p>

                    <p className="mt-12 text-sm">W razie pytań dotyczących prywatności, prosimy o kontakt pod adresem: {SITE.contactEmail}.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
