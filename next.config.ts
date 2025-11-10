/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // habilita la exportación estática
  images: {
    unoptimized: true, // evita optimización de imágenes que requiere servidor
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
}

module.exports = nextConfig

