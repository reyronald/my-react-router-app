import { type Meta, type StoryObj } from "@storybook/react"
import { createRoutesStub } from "react-router"
import { StyledLink } from "./StyledLink"

const meta = {
  component: StyledLink,
  args: {
    to: "/",
    children: "Click me!",
  },
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
} satisfies Meta<typeof StyledLink>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
