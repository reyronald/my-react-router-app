import { type Meta, type StoryObj } from "@storybook/react"
import { createRoutesStub } from "react-router"
import { ErrorBoundaryImpl } from "./ErrorBoundaryImpl"

const meta = {
  component: ErrorBoundaryImpl,
} satisfies Meta<typeof ErrorBoundaryImpl>

export default meta

type Story = StoryObj<typeof meta>

export const RouteErrorResponse = {
  args: {
    error: {
      status: 500,
      statusText: "Internal Server Error",
      internal: true,
      data: "Something went wrong",
    },
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
} satisfies Story

export const ErrorInstance = {
  args: {
    error: (() => {
      const error = new Error("Something went wrong")
      error.stack = `${error.name} ${error.message}
    at ErrorBoundaryImpl (ErrorBoundaryImpl.tsx:10:5)
    at App (App.tsx:20:10)
    at renderWithHooks (react-dom.development.js:15000:18)
    at mountIndeterminateComponent (react-dom.development.js:17846:13)
    at beginWork (react-dom.development.js:19098:16)
    at performUnitOfWork (react-dom.development.js:22815:12)
    at workLoopSync (react-dom.development.js:22722:5)
    at renderRootSync (react-dom.development.js:22665:7)
    at performSyncWorkOnRoot (react-dom.development.js:22290:7)
    at scheduleUpdateOnFiber (react-dom.development.js:21881:3)
      `.trim()
      return error
    })(),
  },
} satisfies Story

export const Unknown = {
  args: {
    error: "Whoopsie!",
  },
} satisfies Story
