/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        cream: "#F2F0ED", // Tło beżowe z grafiki
        "primary-green": "#556749", // Główny zielony (przyciski)
        "secondary-green": "#98A66C", // Jasny zielony (akcenty)
        "accent-pink": "#F9C8D9", // Różowy (detale, logo)
        "accent-yellow": "#F1E6A8", // Żółty (akcenty)
        "text-dark": "#1A1A1A", // Napisy "prawie czarne"
        "text-stone": "#1A1A1A", // Alias dla kompatybilności wstecznej
        "primary-mocha": "#556749", // Alias dla przycisków
        "secondary-sage": "#98A66C", // Alias dla kompatybilności
        "highlight-blush": "#F9C8D9", // Alias dla różu
        "light-cream": "#F9F7F5",
        "danger-red": "#D94F4F",
        "warning-amber": "#E5A84B",
      },
      fontFamily: {
        serif: ["PlayfairDisplay_700Bold", "serif"],
        "serif-regular": ["PlayfairDisplay_400Regular", "serif"],
        "serif-italic": ["PlayfairDisplay_400Regular_Italic", "serif"],
        sans: ["Inter_400Regular", "sans-serif"],
        "sans-medium": ["Inter_500Medium", "sans-serif"],
        "sans-semibold": ["Inter_600SemiBold", "sans-serif"],
        "sans-bold": ["Inter_700Bold", "sans-serif"],
      },
      borderRadius: {
        bento: "30px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(74, 66, 56, 0.08)",
        card: "0 4px 16px rgba(74, 66, 56, 0.06)",
      },
    },
  },
  plugins: [],
};
