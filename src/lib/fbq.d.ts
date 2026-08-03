declare global {
    interface Window {
        fbq?: (command: "init" | "track" | "trackCustom", ...args: unknown[]) => void;
    }
}

export {};
