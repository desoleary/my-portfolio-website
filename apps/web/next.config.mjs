import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Monorepo root: ~/code/next-nest-graphql-antd-monorepo-with-bff
const repoRoot = path.resolve(__dirname, '../../');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['antd'],

    // Pin the tracing root to your repo (stops Next from walking upward)
    outputFileTracingRoot: repoRoot,

    // Remove experimental.esmExternals (was causing the earlier warning)
    webpack: (config) => {
        // Stable aliases relative to this app dir
        config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
        config.resolve.alias['@graphql'] = path.resolve(__dirname, 'src/graphql');
        config.resolve.alias['@styles'] = path.resolve(__dirname, 'src/styles');
        return config;
    },
};

export default nextConfig;