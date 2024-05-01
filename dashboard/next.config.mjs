/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "api.infrakeysapp.in",
        port: "3001",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
