import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
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
    default: "OH! Club — cykl i dobrostan",
    template: "%s | OH! Club",
  },
  description,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE.url,
    siteName: SITE.name,
    title: "OH! Club — cykl i dobrostan",
    description,
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OH! Club — cykl i dobrostan",
    description,
    images: ["/logo.png"],
  },
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
