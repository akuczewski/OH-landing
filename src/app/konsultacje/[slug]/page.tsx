import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import BenefitIcon from "@/components/BenefitIcon";
import ExpertBooking, { ExpertBookingFallback } from "@/components/ExpertBooking";
import ExpertPhoto from "@/components/ExpertPhoto";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { expertHeading, expertPath, formatPrice } from "@/lib/consultationFormat";
import { getExpertBySlug, getExperts } from "@/lib/consultations";
import { SITE } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
    const experts = await getExperts();
    return experts.map((e) => ({ slug: e.slug || e.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const expert = await getExpertBySlug(decodeURIComponent(slug));
    if (!expert) return { title: "Konsultacje online" };
    const description =
        expert.shortDescription || `Konsultacja online: ${expert.specialization}. ${formatPrice(expert.priceGrosze)}.`;
    return {
        title: `${expertHeading(expert)} · Konsultacje`,
        description,
        alternates: { canonical: expertPath(expert) },
        openGraph: {
            title: `${expertHeading(expert)} · Konsultacje OH! Club`,
            description,
            images: expert.photoUrl ? [{ url: expert.photoUrl }] : undefined,
        },
    };
}

export default async function ExpertPage({ params }: { params: Params }) {
    const { slug } = await params;
    const requested = decodeURIComponent(slug);
    const expert = await getExpertBySlug(requested);
    if (!expert) notFound();
    // Wejście po documentId, a ekspert ma już slug w CMS → 308 na ładny, kanoniczny URL
    // (stare linki z ID dalej działają, ale nie dublują strony).
    if (expert.slug && requested !== expert.slug) permanentRedirect(expertPath(expert));

    const chips = [
        expert.durationMinutes ? `${expert.durationMinutes} minut` : null,
        "Online",
        "Termin wybierasz sama",
    ].filter(Boolean) as string[];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Konsultacja online: ${expertHeading(expert)}`,
        serviceType: expert.specialization,
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        offers: {
            "@type": "Offer",
            price: (expert.priceGrosze / 100).toFixed(2),
            priceCurrency: "PLN",
            url: `${SITE.url}${expertPath(expert)}`,
        },
    };

    return (
        <div className="min-h-screen bg-cream text-text-dark font-sans selection:bg-accent-pink selection:text-text-dark">
            <Navbar />
            <main className="pt-28 md:pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
                <Link
                    href="/konsultacje"
                    className="inline-flex items-center gap-2 font-semibold text-primary-green hover:underline underline-offset-4 mb-6"
                >
                    <span aria-hidden="true">←</span> Wszyscy eksperci
                </Link>

                <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start">
                    <div className="lg:sticky lg:top-28 aspect-[4/5] rounded-[2rem] overflow-hidden shadow-card">
                        <ExpertPhoto expert={expert} tone="sage" sizes="(min-width: 1024px) 520px, 100vw" priority />
                    </div>

                    <div>
                        {expert.specialization && (
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-pink-deep">
                                {expert.specialization}
                            </p>
                        )}
                        <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-bold mt-3 leading-tight">
                            {expertHeading(expert)}
                        </h1>
                        {expert.description && (
                            <p className="text-lg text-text-dark/70 leading-relaxed mt-5 whitespace-pre-line">
                                {expert.description}
                            </p>
                        )}

                        <ul className="flex flex-wrap gap-2.5 mt-6">
                            {chips.map((chip) => (
                                <li
                                    key={chip}
                                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-text-dark shadow-soft"
                                >
                                    {chip}
                                </li>
                            ))}
                        </ul>

                        {expert.benefits.length > 0 && (
                            <section className="mt-8 rounded-[2rem] bg-white p-6 sm:p-7 shadow-card">
                                <h2 className="font-bold text-text-dark mb-5">Co dostajesz</h2>
                                <ul className="space-y-4">
                                    {expert.benefits.map((b) => (
                                        <li key={b.title} className="flex items-start gap-4">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-pink/35 text-accent-pink-deep">
                                                <BenefitIcon name={b.icon} className="h-5 w-5" />
                                            </span>
                                            <span className="pt-0.5">
                                                <span className="block font-semibold text-text-dark">{b.title}</span>
                                                {b.subtitle && (
                                                    <span className="block text-sm text-text-dark/60 mt-0.5">
                                                        {b.subtitle}
                                                    </span>
                                                )}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        <div className="mt-8">
                            <Suspense fallback={<ExpertBookingFallback expert={expert} />}>
                                <ExpertBooking expert={expert} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
            />
        </div>
    );
}
