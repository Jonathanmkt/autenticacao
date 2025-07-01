/** @type {import('next').NextConfig} */
const nextConfig = {
  // Desativa verificação de tipos em produção
  typescript: {
    // Ignora erros de tipo em produção
    ignoreBuildErrors: true,
  },
  // Desativa linting em produção
  eslint: {
    // Ignora erros de linting em produção
    ignoreDuringBuilds: true,
  },
  // Outras configurações
  reactStrictMode: false,
}

module.exports = nextConfig
