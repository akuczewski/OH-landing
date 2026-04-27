import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function DeleteAccount() {
    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <h1 className="font-serif text-5xl text-primary-green mb-8">Usuwanie Konta i Danych</h1>
                
                <div className="prose prose-lg text-text-dark/80 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm max-w-none">
                    <p className="mb-6">
                        W <strong>OH! Club</strong> szanujemy Twoje prawo do prywatności. Jeśli zdecydujesz się przestać korzystać z naszej aplikacji, umożliwiamy całkowite usunięcie Twojego konta oraz wszystkich powiązanych z nim danych osobowych.
                    </p>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">Jak usunąć konto i dane?</h2>
                    <p>Możesz to zrobić na dwa sposoby:</p>

                    <h3 className="text-xl font-bold mt-6 mb-2">Sposób 1: Bezpośrednio w aplikacji (zalecane)</h3>
                    <p>Jest to najszybsza metoda, która automatycznie usuwa Twoje dane z naszych serwerów:</p>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Otwórz aplikację <strong>OH! Club</strong>.</li>
                        <li>Przejdź do zakładki <strong>Profil</strong> (ikona w prawym dolnym rogu).</li>
                        <li>Wybierz sekcję <strong>Ustawienia profilu</strong> (przycisk w górnej części ekranu).</li>
                        <li>Przewiń na sam dół strony.</li>
                        <li>Kliknij czerwony napis <strong>USUŃ WSZYSTKIE DANE</strong>.</li>
                        <li>Potwierdź swoją decyzję w wyskakującym oknie.</li>
                    </ol>

                    <h3 className="text-xl font-bold mt-6 mb-2">Sposób 2: Kontakt e-mailowy</h3>
                    <p>
                        Jeśli nie masz już dostępu do aplikacji, możesz wysłać prośbę o usunięcie danych na adres: 
                        <a href="mailto:[Adres e-mail]" className="text-primary-green hover:underline"> [Adres e-mail]</a>. 
                        W wiadomości podaj adres e-mail, na który zarejestrowane jest Twoje konto. Twoja prośba zostanie zrealizowana w ciągu 14 dni roboczych.
                    </p>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">Jakie dane zostaną usunięte?</h2>
                    <p>Po zleceniu usunięcia konta, z naszych serwerów zostaną trwale skasowane następujące informacje:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Dane identyfikacyjne (adres e-mail, identyfikator użytkownika).</li>
                        <li>Wszystkie dane biometryczne (wiek, waga, wzrost).</li>
                        <li>Historia cyklu menstruacyjnego i logi zdrowotne.</li>
                        <li>Wygenerowane plany żywieniowe i treningowe.</li>
                        <li>Statystyki aktywności i osiągnięte odznaki.</li>
                    </ul>
                    <p className="mt-4 italic">
                        Uwaga: Operacja ta jest nieodwracalna. Po usunięciu konta nie będziemy mogli przywrócić Twoich postępów ani historii.
                    </p>

                    <h2 className="text-2xl font-serif text-primary-green mt-8 mb-4">Informacja o deweloperze</h2>
                    <p>
                        Aplikacja <strong>OH! Club</strong> jest rozwijana przez <strong>Great Skill Arkadiusz Kuczewski</strong>. 
                        Dbamy o to, aby Twoje dane były przetwarzane zgodnie z najwyższymi standardami bezpieczeństwa aż do momentu ich trwałego usunięcia.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
