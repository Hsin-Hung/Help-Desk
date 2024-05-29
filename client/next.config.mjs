/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ticket",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
