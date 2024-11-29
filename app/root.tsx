import type { LinksFunction, MetaFunction, UIMatch } from "react-router"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useRouteError,
} from "react-router"

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import merge from "deepmerge"
import { useState } from "react"

import { ErrorBoundaryImpl } from "~/components/ErrorBoundaryImpl/ErrorBoundaryImpl"

import "./tailwind-directives.css"
import "./app.css"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export const meta: MetaFunction = () => [{ title: "My react router app" }]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <ErrorBoundaryImpl error={error} />
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  const dehydratedState = useDehydratedState()

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <Outlet />
      </HydrationBoundary>
    </QueryClientProvider>
  )
}

const useDehydratedState = (): DehydratedState | undefined => {
  const matches = useMatches() as UIMatch<{ dehydratedState?: DehydratedState }>[]

  const dehydratedState = matches
    .map((match) => match.data?.dehydratedState)
    .filter((d) => d != null)

  return dehydratedState.length
    ? dehydratedState.reduce(
        (accumulator, currentValue) => merge(accumulator, currentValue),
        {} as DehydratedState,
      )
    : undefined
}
