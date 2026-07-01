import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Performance ──────────────────────────────────────── */
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: true,

  /* ── Static Generation ─────────────────────────────────── */
  output: undefined, // Set to "export" for pure SSG, leave undefined for hybrid

  /* ── Image Optimization ────────────────────────────────── */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },

  /* ── Compressor ────────────────────────────────────────── */
  compress: true,

  /* ── Redirects ─────────────────────────────────────────── */
  async redirects() {
    return [
      {
        source: "/geld-en-verzekeringen/maximale-hypotheek",
        destination: "/hypotheek/maximale-hypotheek",
        permanent: true,
      },
    ];
  },

  /* ── Security Headers ──────────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
      {
        // Allow Google AdSense scripts
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
              "frame-src https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
              "img-src 'self' data: https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
