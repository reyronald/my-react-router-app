import { type StoryObj, type Meta } from "@storybook/react"
import { Centered } from "./Centered"

const meta = {
  component: Centered,
  args: {
    children: "Hello World!",
  },
} satisfies Meta<typeof Centered>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
