import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Media zdjęć twórców treści pochodzi ze Strapi Cloud (zob. src/lib/strapi.ts).
    remotePatterns: [
      { protocol: "https", hostname: "*.strapiapp.com" },
      { protocol: "https", hostname: "*.media.strapiapp.com" },
    ],
  },
  // Robocza wersja nowej strony głównej trafiła na "/"; stary link (wysłany do testów) prowadzi na home.
  async redirects() {
    return [{ source: "/nowy-landing", destination: "/", permanent: true }];
  },
};

export default nextConfig;
