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

declare module "eslint-plugin-react-compiler" {
  import type { Rule } from "eslint"

  const plugin: {
    rules: Record<string, Rule.RuleModule>
  }

  export default plugin
}
