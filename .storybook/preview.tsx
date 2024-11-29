import type { Preview } from "@storybook/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { initialize as initializeMSW, mswLoader } from "msw-storybook-addon"
import React from "react"

import "../app/app.css"

initializeMSW()

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
