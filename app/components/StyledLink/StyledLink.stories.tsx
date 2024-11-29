import { type StoryObj, type Meta } from "@storybook/react"
import { StyledLink } from "./StyledLink"

const meta = {
  component: StyledLink,
  args: {
    to: "/",
    children: "Click me!",
  },
} satisfies Meta<typeof StyledLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
