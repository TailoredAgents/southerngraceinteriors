import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // The image library is already compressed for the web. Serving these files
    // directly avoids memory-heavy, on-demand AVIF/WebP encoding on Render's
    // 512 MB instance while preserving lazy loading and layout stability.
    unoptimized: true,
  },
  async headers() {
    const imageCache = [
      { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" },
    ];
    return [
      { source: "/images/:path*", headers: imageCache },
      { source: "/og.png", headers: imageCache },
    ];
  },
};

export default nextConfig;
