/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 🔥 permite imagens de qualquer domínio HTTPS
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**', // caso use imagens do seu back local
      },
    ],
  },
};

export default nextConfig;
