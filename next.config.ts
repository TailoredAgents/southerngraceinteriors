import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // The image library is already compressed for the web. Serving these files
    // directly avoids memory-heavy, on-demand AVIF/WebP encoding on Render's
    // 512 MB instance while preserving lazy loading and layout stability.
    unoptimized: true,
  },
};

export default nextConfig;
