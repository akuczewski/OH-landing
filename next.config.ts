import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Media zdjęć twórców treści pochodzi ze Strapi Cloud (zob. src/lib/strapi.ts).
    remotePatterns: [
      { protocol: "https", hostname: "*.strapiapp.com" },
      { protocol: "https", hostname: "*.media.strapiapp.com" },
    ],
  },
};

export default nextConfig;
