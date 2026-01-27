import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "prisma/**",
            "*.config.js",
            "*.config.mjs",
        ],
    },
    ...compat.extends("next/core-web-vitals"),
    {
        rules: {
            "react/no-unescaped-entities": "off",
        },
    },
];

export default eslintConfig;

