import { reactRouter } from "@react-router/dev/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vite"

const isStorybook = process.argv[1]?.includes("storybook")

const isVitest = process.env.VITEST === "true"

export default defineConfig({
  plugins: [!isStorybook && !isVitest && reactRouter(), tsconfigPaths()],
  test: {
    include: ["./app/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup/setup-test-env.ts"],
    globalSetup: ["./tests/setup/global-setup.ts"],
    restoreMocks: true,
    coverage: {
      include: ["app/**/*.{ts,tsx}"],
      all: true,
    },
    environment: "happy-dom",
  },
})
