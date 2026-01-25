/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.tmobile.com" },
      { protocol: "https", hostname: "laptop.bg" },
    ],
  },
  // Required for bcrypt and other native modules
  serverExternalPackages: ["bcrypt"],
};

export default nextConfig;
