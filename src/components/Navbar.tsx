"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import SocialLinks from "./SocialLinks";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/aplikacja", label: "Aplikacja" },
    { href: "/tworcy", label: "Twórcy" },
    { href: "/cennik", label: "Cennik" },
    { href: "/konsultacje", label: "Konsultacje" },
] as const;

function isActive(pathname: string, href: string) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Pływająca pigułka nawigacji. Na mobile (< md) linki chowają się za
 * hamburgerem: pigułka "rozlewa się" w kartę z tym samym szklanym tłem,
 * linki wchodzą kaskadowo. Animacje wyłączane przy prefers-reduced-motion.
 */
export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);

    const close = useCallback(() => setOpen(false), []);

    // Zamknij po przejściu na inną stronę (także wstecz w przeglądarce).
    // Wzorzec "stan z poprzedniego renderu" zamiast efektu — bez dodatkowego renderu.
    const [lastPathname, setLastPathname] = useState(pathname);
    if (pathname !== lastPathname) {
        setLastPathname(pathname);
        setOpen(false);
    }

    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        // Po obróceniu telefonu / poszerzeniu okna do desktopu menu mobilne nie ma sensu.
        const desktop = window.matchMedia("(min-width: 768px)");
        const onDesktop = (e: MediaQueryListEvent) => e.matches && setOpen(false);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        desktop.addEventListener("change", onDesktop);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
            desktop.removeEventListener("change", onDesktop);
        };
    }, [open]);

    return (
        <>
            {/* Przyciemnienie tła pod otwartym menu (tap = zamknij). */}
            <div
                aria-hidden="true"
                onClick={close}
                className={`fixed inset-0 z-40 bg-text-dark/20 backdrop-blur-[2px] md:hidden transition-opacity duration-300 motion-reduce:transition-none ${
                    open ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            <header className="fixed top-4 md:top-6 inset-x-4 md:inset-x-6 z-50">
                <div
                    className={`max-w-6xl mx-auto backdrop-blur-xl ring-1 ring-black/[0.05] shadow-soft px-5 md:px-7 py-3 transition-[border-radius,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        open
                            ? "rounded-[28px] bg-light-cream/95 shadow-[0_24px_60px_-20px_rgba(74,66,56,0.35)]"
                            : "rounded-[32px] md:rounded-full bg-light-cream/80"
                    }`}
                >
                    <div className="flex justify-between items-center">
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
                            {NAV_LINKS.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                                    className="hover:text-primary-green transition-colors text-text-dark/80 hover:text-text-dark aria-[current=page]:text-primary-green"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href="/pobierz"
                                className="bg-accent-pink text-primary-green px-5 md:px-6 py-2.5 rounded-full text-sm font-semibold hover:brightness-95 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
                            >
                                Pobierz aplikację
                            </Link>

                            <button
                                ref={toggleRef}
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                aria-expanded={open}
                                aria-controls="mobile-menu"
                                aria-label={open ? "Zamknij menu" : "Otwórz menu"}
                                className="md:hidden relative w-11 h-11 -mr-1.5 rounded-full flex items-center justify-center text-primary-green bg-primary-green/[0.06] hover:bg-primary-green/10 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green/40"
                            >
                                {/* Dwie kreski (dolna krótsza) morfujące w X. */}
                                <span
                                    aria-hidden="true"
                                    className={`absolute h-[1.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                                        open ? "w-[18px] rotate-45 translate-y-0" : "w-[18px] -translate-y-[4px]"
                                    }`}
                                />
                                <span
                                    aria-hidden="true"
                                    className={`absolute h-[1.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                                        open
                                            ? "w-[18px] -rotate-45 translate-x-0 translate-y-0"
                                            : "w-[12px] translate-x-[3px] translate-y-[4px]"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Panel mobilny — rozwijany trikiem grid-rows 0fr → 1fr (płynna wysokość bez mierzenia). */}
                    <div
                        id="mobile-menu"
                        inert={!open}
                        className={`md:hidden grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                        <div className="overflow-hidden">
                            <nav aria-label="Menu" className="pt-5 pb-2">
                                <ul className="border-t border-primary-green/10">
                                    {NAV_LINKS.map((l, i) => {
                                        const active = isActive(pathname, l.href);
                                        return (
                                            <li
                                                key={l.href}
                                                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                                                className={`border-b border-primary-green/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                                                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                                                }`}
                                            >
                                                <Link
                                                    href={l.href}
                                                    onClick={close}
                                                    aria-current={active ? "page" : undefined}
                                                    className="group flex items-baseline gap-4 py-4"
                                                >
                                                    <span className="w-6 text-[11px] font-semibold tabular-nums tracking-wider text-secondary-green">
                                                        {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    <span
                                                        className={`font-serif text-[28px] leading-none tracking-tight transition-colors ${
                                                            active ? "text-primary-green" : "text-text-dark group-active:text-primary-green"
                                                        }`}
                                                    >
                                                        {l.label}
                                                    </span>
                                                    {active ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="ml-auto mr-1.5 self-center w-2 h-2 rounded-full bg-accent-pink ring-4 ring-accent-pink/30"
                                                        />
                                                    ) : (
                                                        <svg
                                                            aria-hidden="true"
                                                            viewBox="0 0 16 16"
                                                            className="ml-auto self-center w-4 h-4 text-primary-green/40 transition-transform group-active:translate-x-1"
                                                        >
                                                            <path
                                                                d="M3 8h10M9 4l4 4-4 4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div
                                    style={{ transitionDelay: open ? `${80 + NAV_LINKS.length * 45}ms` : "0ms" }}
                                    className={`flex items-center justify-between pt-5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                                        open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                                    }`}
                                >
                                    <Link
                                        href="/kontakt"
                                        onClick={close}
                                        className="text-sm font-semibold text-text-dark/70 hover:text-primary-green transition-colors"
                                    >
                                        Kontakt
                                    </Link>
                                    <SocialLinks variant="light" />
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
