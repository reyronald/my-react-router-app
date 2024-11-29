import { type StoryObj, type Meta } from "@storybook/react"
import { ErrorBoundaryImpl } from "./ErrorBoundaryImpl"

const meta = {
  component: ErrorBoundaryImpl,
  args: {
    error: "unknown",
  },
} satisfies Meta<typeof ErrorBoundaryImpl>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
