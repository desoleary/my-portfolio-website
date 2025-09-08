// eslint.config.mjs (root)

import web from "./apps/web/eslint.config.mjs";
import api from "./apps/api/eslint.config.mjs";
import shared from "./packages/shared/eslint.config.mjs";
import nodeConfig from "./packages/config/eslint-config/node.mjs";

// Helper: scope configs to paths
const scope = (cfgArray, globs) =>
    cfgArray.map((c) => ({ ...c, files: globs }));

export default [
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/.next/**",
            "**/coverage/**",
            "**/.turbo/**",
            "**/*.tsbuildinfo"
        ]
    },
    {
        files: [
            "**/vitest.config.{ts,js,mjs,cjs}",
            "**/vite.config.{ts,js,mjs,cjs}",
            "**/next.config.{ts,js,mjs,cjs}",
            "**/eslint.config.{ts,js,mjs,cjs}"
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module"
        },
        rules: {
            // no-op rules: just matching these files removes warnings
        }
    },

    ...scope(web, ["apps/web/**"]),
    ...scope(api, ["apps/api/**"]),
    ...scope(shared, ["packages/shared/**"]),
    ...scope(nodeConfig, ["packages/config/**"])
];