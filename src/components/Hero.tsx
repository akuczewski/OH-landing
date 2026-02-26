import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-pink/30 blur-3xl"></div>
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-secondary-green/20 blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent-yellow/30 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start z-10">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-accent-pink/50 text-text-dark text-sm font-semibold tracking-wide border border-accent-pink">
                        Twój nowy przewodnik po zdrowiu
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6 text-primary-green leading-[1.1] tracking-tight">
                        Zrozum swoje ciało. <br className="hidden md:block" />
                        <span className="text-secondary-green italic">Zadbaj o swój cykl.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-dark/80 max-w-xl mb-10 leading-relaxed font-medium">
                        Odkryj pierwszą polską aplikację, która proaktywnie dostosowuje plany dietetyczne, treningi i rytuały pielęgnacyjne do Twojej aktualnej fazy cyklu.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
                        <Link
                            href="/pobierz"
                            className="bg-text-dark text-cream px-8 py-4 rounded-full text-lg font-bold shadow-soft hover:shadow-card transform hover:-translate-y-1 transition-all text-center"
                        >
                            Rozpocznij darmowy test
                        </Link>
                        <Link
                            href="/#features"
                            className="bg-transparent border-2 border-primary-green text-primary-green px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-green/5 transition-all text-center"
                        >
                            Poznaj funkcje
                        </Link>
                    </div>
                    <div className="mt-8 flex items-center gap-4 text-sm text-text-dark/60 font-medium">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-cream bg-secondary-green/40 flex items-center justify-center text-xs font-bold text-primary-green">
                                    👩
                                </div>
                            ))}
                        </div>
                        <p>Dołącz do tysięcy zadowolonych kobiet</p>
                    </div>
                </div>

                <div className="flex-1 relative w-full max-w-md lg:max-w-full flex justify-center lg:justify-end z-10 mt-12 lg:mt-0">
                    {/* Mockup Placeholder */}
                    <div className="relative w-[300px] h-[600px] md:w-[350px] md:h-[700px] bg-light-cream border-8 border-text-dark rounded-[3rem] shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-text-dark rounded-b-3xl z-20"></div>
                        <img
                            src="/screenshots/home.png"
                            alt="Aplikacja OH! Club - widok główny"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Floating UI Elements for aesthetic */}
                    <div className="absolute top-20 -left-10 lg:left-0 bg-light-cream p-4 rounded-2xl shadow-card transform -rotate-6 animate-pulse">
                        <div className="w-32 h-4 bg-accent-pink rounded-md mb-2"></div>
                        <div className="w-24 h-3 bg-text-dark/10 rounded-md"></div>
                    </div>

                    <div className="absolute bottom-32 -right-6 lg:-right-10 bg-light-cream p-4 rounded-2xl shadow-card transform rotate-6 animate-pulse" style={{ animationDelay: '1s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary-green"></div>
                            <div>
                                <div className="w-20 h-4 bg-text-dark rounded-md mb-1"></div>
                                <div className="w-16 h-3 bg-text-dark/10 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
