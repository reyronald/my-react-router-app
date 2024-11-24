import { isRouteErrorResponse } from "react-router"

import { Centered } from "~/components/Centered/Centered"
import { MyLink } from "~/components/MyLink/MyLink"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Centered>
      <div className="flex flex-col gap-6">
        {children}

        <MyLink to="/">Go to the home page</MyLink>
      </div>
    </Centered>
  )
}

function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl font-bold text-red-500">{children}</h1>
}

function Pre({ children }: { children: React.ReactNode }) {
  return <pre className="bg-gray-800 p-4 rounded-md text-red-400 overflow-auto">{children}</pre>
}

export function ErrorBoundaryImpl({ error }: { error: unknown }) {
  if (isRouteErrorResponse(error)) {
    return (
      <Layout>
        <H1>
          {error.status} {error.statusText}
        </H1>
        <p className="text-xl">{error.data}</p>
      </Layout>
    )
  } else if (error instanceof Error) {
    return (
      <Layout>
        <H1>Error</H1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <Pre>{error.stack}</Pre>
      </Layout>
    )
  } else {
    ;<Layout>
      <H1>Unknown Error</H1>

      <Pre>{String(error)}</Pre>

      <Pre>{JSON.stringify(error, null, 2)}</Pre>
    </Layout>
  }
}
