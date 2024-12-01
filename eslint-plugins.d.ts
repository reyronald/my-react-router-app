declare module "eslint-plugin-react-hooks" {
  import type { ESLint } from "eslint"

  const plugin: Omit<ESLint.Plugin, "configs"> & {
    // eslint-plugin-react-hooks does not use FlatConfig yet
    configs: {
      recommended: {
        rules: Partial<Record<string, RuleEntry>>
      }
    }
  }

  export default plugin
}

declare module "eslint-plugin-eslint-comments" {
  import type { ESLint } from "eslint"

  const plugin: Omit<ESLint.Plugin, "configs"> & {
    // eslint-plugin-react-hooks does not use FlatConfig yet
    configs: {
      recommended: {
        rules: Partial<Record<string, RuleEntry>>
      }
    }
  }

  export default plugin
}
