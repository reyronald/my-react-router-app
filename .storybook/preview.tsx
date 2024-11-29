import type { Preview } from "@storybook/react"
import React from "react"
import { createRoutesStub } from "react-router"

import "../app/app.css"

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
  decorators: [
    function reactRouterDecorator(Story, context) {
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: Story,
        },
      ])
      return <Stub />
    },
  ],
}

export default preview
