/** @type {import('next').NextConfig} */

// Set STATIC_EXPORT=1 to emit a fully static site into `out/` (for sharing a
// no-server HTML preview). Left unset, the app runs as a normal Next.js server
// app with image optimisation — the path your developer will use.
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  ...(isExport ? { output: "export" } : {}),
  images: {
    // Static export can't run the image optimiser, so serve images as-is.
    unoptimized: isExport,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
