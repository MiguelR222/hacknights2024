import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', // This allows any path under placehold.co
      },
    ],
    dangerouslyAllowSVG: true, // Allow SVG images
  },
};

export default nextConfig;
