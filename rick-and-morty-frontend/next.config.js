/** @type {import('next').NextConfig} */
const nextConfig = {
    // next.config.js

    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: "rickandmortyapi.com",          
        },
      ],
    },

  
}

module.exports = nextConfig
