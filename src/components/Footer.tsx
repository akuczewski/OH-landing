import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-primary-green text-light-cream py-16 px-6 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="md:col-span-1 border-b border-light-cream/20 md:border-0 pb-8 md:pb-0">
                    <Link href="/" className="font-serif text-4xl font-bold tracking-tighter text-accent-pink mb-6 inline-block">
                        OH! Club
                    </Link>
                    <p className="text-light-cream/80 text-sm leading-relaxed mb-6 font-medium">
                        Twoja aplikacja, która rozumie kobiecy organizm. Połącz cykl, dietę, pielęgnację i medytację w jednym miejscu.
                    </p>
                </div>

                <div>
                    <h3 className="font-serif text-xl font-bold mb-6 text-accent-yellow">Produkt</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/#features" className="hover:text-accent-pink transition-colors">Funkcje</Link></li>
                        <li><Link href="/cennik" className="hover:text-accent-pink transition-colors">Cennik</Link></li>
                        <li><Link href="/opinie" className="hover:text-accent-pink transition-colors">Opinie użytkowniczek</Link></li>
                        <li><Link href="/pobierz" className="hover:text-accent-pink transition-colors">Pobierz aplikację</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-serif text-xl font-bold mb-6 text-accent-yellow">Firma</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/o-nas" className="hover:text-accent-pink transition-colors">O nas</Link></li>
                        <li><Link href="/kontakt" className="hover:text-accent-pink transition-colors">Kontakt</Link></li>
                        <li><Link href="/media" className="hover:text-accent-pink transition-colors">Dla mediów</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-serif text-xl font-bold mb-6 text-accent-yellow">Prawne</h3>
                    <ul className="space-y-4 text-sm font-medium">
                        <li><Link href="/regulamin" className="hover:text-accent-pink transition-colors">Regulamin</Link></li>
                        <li><Link href="/polityka-prywatnosci" className="hover:text-accent-pink transition-colors">Polityka Prywatności</Link></li>
                        <li><Link href="/cookies" className="hover:text-accent-pink transition-colors">Polityka Cookies</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-light-cream/20 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-light-cream/60 font-medium">
                    &copy; {new Date().getFullYear()} OH! Club. Wszelkie prawa zastrzeżone.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-light-cream/10 flex items-center justify-center hover:bg-accent-pink hover:text-primary-green transition-all">
                        IG
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-light-cream/10 flex items-center justify-center hover:bg-accent-pink hover:text-primary-green transition-all">
                        FB
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-light-cream/10 flex items-center justify-center hover:bg-accent-pink hover:text-primary-green transition-all">
                        TT
                    </a>
                </div>
            </div>
        </footer>
    );
}
