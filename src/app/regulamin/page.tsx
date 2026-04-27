import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Terms() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#4A4238] font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh]">
                <header className="mb-12">
                    <h1 className="font-playfair text-4xl md:text-5xl text-primary-green mb-4">Regulamin aplikacji i serwisu</h1>
                    <p className="text-sm text-text-dark/50 italic">Ostatnia aktualizacja: 27 kwietnia 2026 r.</p>
                </header>

                <div className="prose prose-stone max-w-none bg-white p-8 md:p-16 rounded-[2rem] shadow-sm border border-stone-100">
                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">§1 DEFINICJE</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed">
                            <p>
                                1. Pojęcia użyte w niniejszym Regulaminie, zarówno w liczbie pojedynczej, jak i mnogiej, mają następujące znaczenie:
                            </p>
                            <ul className="list-none pl-0 space-y-3">
                                <li><strong>1. Usługodawca</strong> – OH! Club (Właściciel serwisu), prowadzący działalność na rzecz Użytkowników zgodnie z obowiązującymi przepisami prawa.</li>
                                <li><strong>2. OH! Club (dawniej Alloweat)</strong> – aplikacja opracowana oraz prowadzona przez Usługodawcę, udostępniana w wersji mobilnej oraz webowej, służąca do śledzenia cyklu, nawyków oraz wsparcia dobrostanu kobiet.</li>
                                <li><strong>3. Konto</strong> – osobiste konto zakładane przez Użytkownika w aplikacji, umożliwiające dostęp do usług świadczonych przez Usługodawcę.</li>
                                <li><strong>4. Materiały</strong> – wszelkie opracowania, treści, zdjęcia i informacje zamieszczane w aplikacji, w tym plany nawyków, przepisy i treści edukacyjne.</li>
                                <li><strong>5. Użytkownik</strong> – każda osoba fizyczna korzystająca z Aplikacji zgodnie z jej przeznaczeniem.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">§2 ZAKRES PRZEDMIOTOWY REGULAMINU</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed">
                            <p>1. Regulamin określa ogólne zasady i warunki korzystania z aplikacji OH! Club, a w szczególności:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>warunki świadczenia usług drogą elektroniczną;</li>
                                <li>standardy techniczne niezbędne do korzystania z usług;</li>
                                <li>zasady zawierania i rozwiązywania umów;</li>
                                <li>rodzaje dostępnych funkcjonalności i treści;</li>
                                <li>składanie i rozpatrywanie reklamacji.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">§3 ZAKRES USŁUG I WYMAGANIA TECHNICZNE</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed">
                            <p>1. Aplikacja OH! Club oferuje następujące funkcjonalności:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Monitorowanie cyklu menstruacyjnego i prognozowanie faz;</li>
                                <li>Dostęp do planów budowania nawyków i programów tematycznych;</li>
                                <li>Dziennik nastroju i objawów;</li>
                                <li>Treści edukacyjne i artykuły eksperckie;</li>
                                <li>Fotodzienniczek i analizę postępów.</li>
                            </ul>
                            <p>2. Wymagania techniczne: System iOS w wersji 15.0 lub nowszej, system Android w wersji 8.0 lub nowszej, aktywne połączenie z Internetem.</p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">§4 WARUNKI KORZYSTANIA</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed">
                            <p>
                                1. Usługi oferowane przez Usługodawcę nie stanowią świadczeń zdrowotnych ani porad lekarskich. 
                                Nie mogą być podstawą do podejmowania bądź zaniechania leczenia bez konsultacji z lekarzem specjalistą.
                            </p>
                            <p>
                                2. Użytkownik jest odpowiedzialny za zachowanie poufności swoich danych logowania.
                            </p>
                            <p>
                                3. Zakazane jest dostarczanie przez Użytkownika treści o charakterze bezprawnym, obraźliwym lub naruszającym dobra osób trzecich.
                            </p>
                        </div>
                    </section>

                    <section className="mb-10">
                        <h2 className="font-playfair text-2xl text-primary-green border-b border-stone-100 pb-2 mb-6">§5 REKLAMACJE I ODSTĄPIENIE</h2>
                        <div className="space-y-4 text-stone-600 leading-relaxed">
                            <p>
                                1. Wszelkie reklamacje dotyczące działania Serwisu mogą być zgłaszane drogą elektroniczną na adres: hello@ohclub.app.
                            </p>
                            <p>
                                2. Usługodawca rozpatruje reklamacje w terminie 14 dni od ich otrzymania.
                            </p>
                            <p>
                                3. Użytkownik będący Konsumentem ma prawo do odstąpienia od umowy w terminie 14 dni, chyba że rozpoczęto świadczenie usług cyfrowych za jego wyraźną zgodą przed upływem tego terminu.
                            </p>
                        </div>
                    </section>

                    <div className="mt-12 pt-8 border-t border-stone-100 text-center">
                        <p className="text-stone-400 text-sm">
                            Pełna treść regulaminu jest dostępna do pobrania w formacie PDF w ustawieniach aplikacji.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
