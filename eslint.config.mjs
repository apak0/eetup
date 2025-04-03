import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintJS from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintJS.configs.recommended,
  tseslint.configs.strict,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Own rules:
      "no-param-reassign": [
        "error",
        { props: true, ignorePropertyModificationsForRegex: ["_$"] },
      ],

      // Overwritten extended rules:
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "jsx-a11y/no-autofocus": "off",

      // Plugin rules:
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "error",
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages `react` related packages come first.
            ["^react", "^@?\\w"],
            // Aliases.
            ["^(index|constants|assets|styles)(/.*|$)"],
            ["^(components|utils|services)(/.*|$)"],
            ["^(pages)(/.*|$)"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.?(css)$"],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
