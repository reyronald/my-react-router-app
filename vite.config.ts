import { reactRouter } from "@react-router/dev/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vite"

const isStorybook = process.argv[1]?.includes("storybook")

export default defineConfig({
  plugins: [!isStorybook && reactRouter(), tsconfigPaths()],
})
