import path from 'node:path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/icons-svg'],
  experimental: { esmExternals: 'loose' },
  webpack: config => {
    config.resolve.alias['@components'] = path.resolve(process.cwd(), 'apps/web/src/components')
    config.resolve.alias['@graphql'] = path.resolve(process.cwd(), 'apps/web/src/graphql')
    return config
  }
}
export default nextConfig
