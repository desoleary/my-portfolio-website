const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Helps ensure AntD packages are transpiled correctly if needed
    transpilePackages: ['antd', '@ant-design/icons', '@ant-design/icons-svg'],
    experimental: {
        esmExternals: 'loose'
    },
    webpack: (config) => {
        config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
        config.resolve.alias['@graphql'] = path.resolve(__dirname, 'src/graphql');
        return config;
    }
};
module.exports = nextConfig;