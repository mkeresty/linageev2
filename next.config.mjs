/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
          
        ],
      },
    //   async redirects() {
    //     return [
    //         {
    //             source: '/mint',
    //             destination: '/comingsoon',
    //             permanent: true,
    //         },
    //     ]
    // },
};

export default nextConfig;
