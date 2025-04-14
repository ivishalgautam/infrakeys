/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.infrakeys.com",
        port: "",
      },
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

export default nextConfig;
