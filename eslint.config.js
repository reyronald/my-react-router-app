// @ts-check

import react from "@eslint-react/eslint-plugin"
import pluginJs from "@eslint/js"
import reactPlugin from "eslint-plugin-react"
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

  pluginJs.configs.recommended,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  react.configs.recommended,

  ...(reactPlugin.configs.flat?.recommended ? [reactPlugin.configs.flat.recommended] : []),
  ...(reactPlugin.configs.flat?.["jsx-runtime"] ? [reactPlugin.configs.flat["jsx-runtime"]] : []),

  { settings: { react: { version: "detect" } } },

  // Overrides
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { args: "none", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/array-type": "off",
    },
  },
]

export default config
