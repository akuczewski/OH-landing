import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import MetaPixel from "@/components/MetaPixel";
import { SITE } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const description = "Dieta, nawyki i pielęgnacja dopasowane do Twoich hormonów i fazy cyklu. Twoje dane zdrowotne zostają na Twoim telefonie.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "OH! Club - cykl i dobrostan",
    template: "%s | OH! Club",
  },
  description,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE.url,
    siteName: SITE.name,
    title: "OH! Club - cykl i dobrostan",
    description,
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OH! Club - cykl i dobrostan",
    description,
    images: ["/logo.png"],
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <CookieConsent />
        <Analytics measurementId={gaMeasurementId} />
        <MetaPixel pixelId={metaPixelId} />
      </body>
    </html>
  );
}
