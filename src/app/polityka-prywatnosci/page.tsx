import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
    title: "Regulamin i polityka prywatności",
    description:
        "Regulamin korzystania z OH! Club oraz informacje o tym, jakie dane zbieramy, w jakim celu je przetwarzamy i jak chronimy Twoją prywatność.",
    alternates: { canonical: "/polityka-prywatnosci" },
};

// Treść (regulamin + polityka prywatności) pochodzi z CMS — patrz LegalDocument.
export default function PrivacyPolicy() {
    return <LegalDocument />;
}
