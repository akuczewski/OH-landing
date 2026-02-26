import Link from "next/link";

export default function Navbar() {
    return (
        <header className="fixed top-0 w-full bg-light-cream/90 backdrop-blur-md z-50 border-b border-secondary-green/20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="font-serif text-3xl font-bold tracking-tighter text-primary-green">
                    OH! Club
                </Link>
                <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
                    <Link href="/o-nas" className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark">
                        O nas
                    </Link>
                    <Link href="/#features" className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark">
                        Funkcje
                    </Link>
                    <Link href="/opinie" className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark">
                        Opinie
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link
                        href="/pobierz"
                        className="bg-primary-green text-light-cream px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary-green transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                        Pobierz aplikację
                    </Link>
                </div>
            </div>
        </header>
    );
}
