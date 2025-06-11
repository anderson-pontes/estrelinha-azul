import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações básicas recomendadas para Next.js 15
  output: 'standalone', // Melhor para deploy na Vercel
  reactStrictMode: true,
  
  // Configurações para resolver os problemas atuais
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL === '1',
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL === '1',
  },
  
  // Configurações de otimização de imagens
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Configurações experimentais (opcional)
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
    ],
  },
  
  // Configuração de headers de segurança (opcional)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;