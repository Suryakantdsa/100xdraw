import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    parser: "@typescript-eslint/parser", // Ensure TypeScript is parsed correctly
    parserOptions: {
      project: "./tsconfig.json", // Ensure it points to your `tsconfig.json`
    },
    plugins: ["@typescript-eslint"],
    rules: {
      // Add or modify any custom rules here
      "@typescript-eslint/no-explicit-any": "error", // Example of rule modification
    },
  },
];

export default eslintConfig;
