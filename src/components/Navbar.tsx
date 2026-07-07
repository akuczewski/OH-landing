import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="fixed top-4 md:top-6 inset-x-4 md:inset-x-6 z-50">
            <div className="max-w-6xl mx-auto bg-light-cream/80 backdrop-blur-xl ring-1 ring-black/[0.05] shadow-soft rounded-full px-5 md:px-7 py-3 flex justify-between items-center transition-all duration-300">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="OH! Club"
                        width={36}
                        height={36}
                        className="rounded-lg shadow-sm"
                    />
                    <span className="font-serif text-xl font-bold tracking-tighter text-primary-green hidden sm:inline-block">
                        OH! Club
                    </span>
                </Link>
                <nav className="hidden md:flex gap-7 text-sm font-semibold tracking-wide">
                    <Link href="/aplikacja" className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark">
                        Aplikacja
                    </Link>
                    <Link href="/tworcy" className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark">
                        Twórcy
                    </Link>
                    <Link href="/o-nas" className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark">
                        O nas
                    </Link>
                    <Link href="/opinie" className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark">
                        Opinie
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link
                        href="/pobierz"
                        className="bg-primary-green text-light-cream px-5 md:px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-secondary-green transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
                    >
                        Pobierz aplikację
                    </Link>
                </div>
            </div>
        </header>
    );
}
