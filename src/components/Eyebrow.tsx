export default function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border border-secondary-green/30 bg-white/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-green/80 ${className}`}
        >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-pink" />
            {children}
        </span>
    );
}
