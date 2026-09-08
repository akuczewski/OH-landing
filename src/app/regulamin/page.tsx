import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
    title: "Regulamin i polityka prywatności",
    description:
        "Regulamin korzystania z OH! Club oraz informacje o tym, jakie dane zbieramy, w jakim celu je przetwarzamy i jak chronimy Twoją prywatność.",
    // Ten sam dokument co /polityka-prywatnosci (dwa wejścia, jedna treść). Kanoniczny
    // URL to /polityka-prywatnosci — tam wskazują linki w App Store / Google Play.
    alternates: { canonical: "/polityka-prywatnosci" },
};

export default function Terms() {
    return <LegalDocument />;
}
