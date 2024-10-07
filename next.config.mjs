import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.clerk.com', 'utfs.io']
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/conversations',
        permanent: true
      }
    ]
  }
}

const PWAWrapper = nextPwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const config = PWAWrapper({
  ...nextConfig,
});

export default config;
