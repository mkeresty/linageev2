/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
          
        ],
      },
      async redirects() {
        return [
            {
                source: '/mint',
                destination: '/comingsoon',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
