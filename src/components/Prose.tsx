import React from "react";

// Renderer treści prawnych z CMS (kolekcja `privacy_sections`) — web-owy odpowiednik
// libs/shared/components/MarkdownContent.tsx z aplikacji mobilnej. Trzymamy tę samą
// semantykę (render linia po linii: pojedynczy \n = łamanie, pusta linia = odstęp,
// wsparcie dla #/##/### , - / * / •, "N.", > , ---, **pogrubienie**), żeby ta sama
// treść wyglądała spójnie w apce i na landingu. Zmieniasz jeden renderer — zajrzyj
// do drugiego.

// Zamiana wielolinijkowych tagów inline i HTML na odpowiedniki Markdown
// przed przetwarzaniem linia po linii.
function preprocess(raw: string): string {
    return raw
        .replace(/<u>([\s\S]+?)<\/u>/g, (_, t) => `<u>${t.replace(/\n+/g, " ").trim()}</u>`)
        .replace(/<strong>([\s\S]+?)<\/strong>/g, (_, t) => `**${t.replace(/\n+/g, " ").trim()}**`)
        .replace(/<b>([\s\S]+?)<\/b>/g, (_, t) => `**${t.replace(/\n+/g, " ").trim()}**`)
        .replace(/<em>([\s\S]+?)<\/em>/g, (_, t) => `_${t.replace(/\n+/g, " ").trim()}_`)
        .replace(/<i>([\s\S]+?)<\/i>/g, (_, t) => `_${t.replace(/\n+/g, " ").trim()}_`)
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<p>([\s\S]+?)<\/p>/gi, (_, t) => `${t.trim()}\n`)
        .replace(/<[^>]+>/g, "");
}

// Formatowanie inline w obrębie fragmentu tekstu: **bold**, _italic_, *italic*, <u>underline</u>.
function renderInline(text: string, keyPrefix: string): React.ReactNode {
    // Bez flagi /s — dopasowania działają w obrębie jednej linii (tekst jest już
    // rozbity po \n), a flaga dotAll wymaga targetu es2018+.
    const PATTERNS: { re: RegExp; tag: "strong" | "em" | "u" }[] = [
        { re: /\*\*(.+?)\*\*/, tag: "strong" },
        { re: /_(.+?)_/, tag: "em" },
        { re: /\*(.+?)\*/, tag: "em" },
        { re: /<u>(.+?)<\/u>/, tag: "u" },
    ];

    let earliest: { index: number; length: number; inner: string; tag: "strong" | "em" | "u" } | null = null;
    for (const { re, tag } of PATTERNS) {
        const m = re.exec(text);
        if (m && (earliest === null || m.index < earliest.index)) {
            earliest = { index: m.index, length: m[0].length, inner: m[1], tag };
        }
    }

    if (earliest === null) return text;

    const before = text.slice(0, earliest.index);
    const after = text.slice(earliest.index + earliest.length);
    const Tag = earliest.tag;
    const cls =
        Tag === "strong" ? "font-semibold text-stone-800" : Tag === "u" ? "underline" : "italic";

    return (
        <>
            {before || null}
            <Tag className={cls}>{renderInline(earliest.inner, `${keyPrefix}i`)}</Tag>
            {after ? renderInline(after, `${keyPrefix}a`) : null}
        </>
    );
}

const P_CLS = "leading-relaxed text-stone-600 mb-1.5";

export default function Prose({ children }: { children: string }) {
    if (!children) return null;

    const lines = preprocess(children).split("\n");
    const nodes: React.ReactNode[] = [];

    // Bufor kolejnych elementów listy (grupujemy je w jeden <ul>/<ol>).
    let listBuffer: { marker: string; text: string }[] = [];
    let listType: "ul" | "ol" | null = null;

    const flushList = () => {
        if (listBuffer.length === 0 || listType === null) return;
        const items = listBuffer;
        const key = `list-${nodes.length}`;
        if (listType === "ul") {
            nodes.push(
                <ul key={key} className="space-y-1.5 my-3">
                    {items.map((it, j) => (
                        <li key={j} className="flex gap-2 leading-relaxed text-stone-600">
                            <span className="text-stone-400 select-none">&bull;</span>
                            <span className="flex-1">{renderInline(it.text, `${key}-${j}-`)}</span>
                        </li>
                    ))}
                </ul>,
            );
        } else {
            nodes.push(
                <ol key={key} className="space-y-1.5 my-3">
                    {items.map((it, j) => (
                        <li key={j} className="flex gap-2 leading-relaxed text-stone-600">
                            <span className="text-stone-400 select-none min-w-[1.25rem]">{it.marker}</span>
                            <span className="flex-1">{renderInline(it.text, `${key}-${j}-`)}</span>
                        </li>
                    ))}
                </ol>,
            );
        }
        listBuffer = [];
        listType = null;
    };

    lines.forEach((raw, i) => {
        const line = raw.trim();
        const key = `l${i}`;

        // Elementy listy — zbieramy do bufora
        if (/^[-*•] /.test(line)) {
            if (listType === "ol") flushList();
            listType = "ul";
            listBuffer.push({ marker: "•", text: line.slice(2) });
            return;
        }
        if (/^\d+\. /.test(line)) {
            const dot = line.indexOf(". ");
            if (listType === "ul") flushList();
            listType = "ol";
            listBuffer.push({ marker: line.slice(0, dot + 1), text: line.slice(dot + 2) });
            return;
        }
        flushList();

        // H1 / H2 / H3
        if (line.startsWith("# ")) {
            nodes.push(
                <h3 key={key} className="font-serif text-2xl text-primary-green mt-8 mb-3 first:mt-0">
                    {line.slice(2)}
                </h3>,
            );
        } else if (line.startsWith("## ")) {
            nodes.push(
                <h3 key={key} className="font-semibold text-lg text-stone-800 mt-6 mb-2 first:mt-0">
                    {line.slice(3)}
                </h3>,
            );
        } else if (line.startsWith("### ")) {
            nodes.push(
                <h4 key={key} className="font-semibold text-stone-800 mt-5 mb-2 first:mt-0">
                    {line.slice(4)}
                </h4>,
            );
        // Cytat
        } else if (line.startsWith("> ")) {
            nodes.push(
                <blockquote
                    key={key}
                    className="border-l-[3px] border-secondary-green/60 pl-4 my-3 italic text-stone-500"
                >
                    {renderInline(line.slice(2), `${key}-`)}
                </blockquote>,
            );
        // Linia pozioma
        } else if (/^-{3,}$/.test(line) || /^\*{3,}$/.test(line)) {
            nodes.push(<hr key={key} className="my-6 border-stone-200" />);
        // Pusta linia = odstęp między akapitami
        } else if (line === "") {
            nodes.push(<div key={key} className="h-2.5" aria-hidden />);
        // Linia będąca w całości pogrubieniem (śródtytuł)
        } else if (/^\*\*(.+)\*\*$/.test(line)) {
            nodes.push(
                <p key={key} className="font-semibold text-stone-800 mt-3 mb-1">
                    {line.slice(2, -2)}
                </p>,
            );
        // Zwykły akapit
        } else {
            nodes.push(
                <p key={key} className={P_CLS}>
                    {renderInline(line, `${key}-`)}
                </p>,
            );
        }
    });

    flushList();

    return <div className="text-[0.95rem]">{nodes}</div>;
}
