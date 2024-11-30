// @ts-check

import react from "@eslint-react/eslint-plugin"
import pluginJs from "@eslint/js"
import vitest from "@vitest/eslint-plugin"
import prettier from "eslint-config-prettier"
import eslintComments from "eslint-plugin-eslint-comments"
import jsxA11y from "eslint-plugin-jsx-a11y"
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import testingLibrary from "eslint-plugin-testing-library"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
const config = [
  { files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"] },
  { ignores: ["coverage", "**/*/+types", "public"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { settings: { react: { version: "detect" } } },

  pluginJs.configs.recommended,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  react.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },

  ...(reactPlugin.configs.flat?.recommended ? [reactPlugin.configs.flat.recommended] : []),
  ...(reactPlugin.configs.flat?.["jsx-runtime"] ? [reactPlugin.configs.flat["jsx-runtime"]] : []),

  jsxA11y.flatConfigs.strict,

  prettier,

  {
    plugins: {
      "eslint-comments": eslintComments,
    },
    rules: eslintComments.configs.recommended.rules,
  },

  // Overrides
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { args: "none", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },

  {
    files: ["**/*/*.test.*"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      "vitest/prefer-expect-assertions": "off",
      "vitest/prefer-lowercase-title": "off",

      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    files: ["**/*/*.test.*"],
    ...testingLibrary.configs["flat/react"],
    ...testingLibrary.configs["flat/dom"],
  },
]

export default config
