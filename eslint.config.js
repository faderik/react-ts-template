// @ts-check
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import path from "path";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import reactNamingConvention from "eslint-plugin-react-naming-convention";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import unusedImport from "eslint-plugin-unused-imports";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs["recommended"],
      tseslint.configs["recommended"],
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs["vite"],

      react.configs.flat["jsx-runtime"],
      importPlugin.flatConfigs["recommended"],
      importPlugin.flatConfigs["typescript"],
      reactNamingConvention.configs["recommended"],
      prettierRecommended,
    ],
    plugins: {
      "unused-imports": unusedImport,
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: path.resolve("./tsconfig.json"),
        },
      },
    },
    rules: {
      //#region naming-convention
      "react-naming-convention/filename": ["warn", { rule: "kebab-case" }],
      //#endregion
      //#region unused-imports
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      //#region props-sort
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: false,
          shorthandLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
        },
      ],
      //#endregion
      //#region import-sort
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@/components/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/assets/**",
              group: "internal",
              position: "after",
            },
            // !SETUP: add more scope here if needed
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
            {
              pattern: "*.s?(c)ss",
              group: "index",
              patternOptions: { matchBase: true },
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      //#endregion
    },
  },
  //#region force named exports in all files
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "import/no-default-export": "error",
      "import/prefer-default-export": "off",
    },
  },
  //#endregion
  //#region force default exports for routed component (pages)
  {
    files: ["src/pages/*/index.tsx"],
    rules: {
      "import/no-default-export": "off",
      "import/prefer-default-export": ["error"],
    },
  },
  //#endregion
]);
