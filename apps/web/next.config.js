/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Helps ensure AntD packages are transpiled correctly if needed
    transpilePackages: ['antd', '@ant-design/icons', '@ant-design/icons-svg'],
    experimental: {
        esmExternals: 'loose'
    }
};
module.exports = nextConfig;