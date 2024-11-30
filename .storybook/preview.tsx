import type { Preview } from "@storybook/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { initialize as initializeMSW, mswLoader } from "msw-storybook-addon"

import "../app/tailwind-directives.css"

initializeMSW(
  location.pathname.includes("github.io")
    ? {
        serviceWorker: {
          url: `my-react-router-app/mockServiceWorker.js`,
        },
      }
    : undefined,
)

const queryClient = new QueryClient()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default preview
