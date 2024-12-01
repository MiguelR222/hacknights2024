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
      {
        protocol: 'https',
        hostname: 'radioshack.com.mx',
        pathname: '/**', // This allows any path under placehold.co
      },
      {
        protocol: 'https',
        hostname: 'www.radioshack.com.mx',
        pathname: '/**', // This allows any path under www.radioshack.com.mx
      },
      {
        protocol: 'https',
        hostname: 'www.totalmarket.com.mx',
        pathname: '/**', // This allows any path under www.totalmarket.com.mx
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**', // This allows any path under m.media-amazon.com
      },
    ],
    dangerouslyAllowSVG: true, // Allow SVG images
  },
};

export default nextConfig;