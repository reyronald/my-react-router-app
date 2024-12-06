import type { LinksFunction, MetaFunction, UIMatch } from "react-router"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useRouteError,
  useRouteLoaderData,
} from "react-router"

import type { DehydratedState } from "@tanstack/react-query"
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query"
import merge from "deepmerge"
import { useState } from "react"
import { getQueryClient } from "./utils/getQueryClient"

import { ErrorBoundaryImpl } from "~/components/ErrorBoundaryImpl/ErrorBoundaryImpl"
import { getClientEnv } from "./utils/config"

import type { Info } from "./+types/root"

import "./_tailwind-directives.css"
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

export function loader() {
  const env = getClientEnv()
  return { env }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<Info["loaderData"]>("root")

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
        {data && (
          // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.env)}`,
            }}
          />
        )}
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
  const [queryClient] = useState(() => getQueryClient())

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
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion
  const matches = useMatches() as UIMatch<{ dehydratedState?: DehydratedState } | null>[]

  const dehydratedState = matches
    .map((match) => match.data?.dehydratedState)
    .filter((d) => d != null)

  return dehydratedState.length
    ? dehydratedState.reduce<DehydratedState>(
        (accumulator, currentValue) => merge(accumulator, currentValue),
        {
          queries: [],
          mutations: [],
        },
      )
    : undefined
}
