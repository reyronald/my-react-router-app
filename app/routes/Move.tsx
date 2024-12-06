import { dehydrate, QueryClient } from "@tanstack/react-query"
import type { Location } from "react-router"
import { useLocation } from "react-router"
import { StyledLink } from "~/components/StyledLink/StyledLink"
import { prefetchMove, useGetMoveSuspended } from "~/queries/move"
import type { Route } from "./+types/Move"
import { Suspense } from "react"
import { Centered } from "~/components/Centered/Centered"

// In this component we're using a Suspense query from React Query in the client.
// This allows us to not have to manually handle loading states and error states
// in the component that executes the query and get access to a data object that
// will always exist.
//
// The loading state is handled by HydrateFallback on initial page load
// and by the Suspense boundary on client-side navigations. In this combination
// the React Query cache is not rehydrated from the server loader though, so
// we always see both the HydrateFallback and Suspense fallback on initial page load,
// not sure why but it doesn't bother me much at the moment because this is not the pattern
// I'm interested in using.
//
// The error state is handled by the ErrorBoundary in the root component
// by we could export an ErrorBoundary in this file and that would be used instead.

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient()

  await prefetchMove(queryClient, params.name)

  return { dehydratedState: dehydrate(queryClient) }
}

export function clientLoader(_: Route.ClientLoaderArgs) {
  // Intentionally empty
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
  // Will be used on initial page load
  return <Centered>Loading with HydrateFallback...</Centered>
}

export default function Move(args: Route.ComponentProps) {
  // Suspense boundary will be used on client-side navigations
  return (
    <Suspense fallback={<Centered>Loading with Suspense...</Centered>}>
      <MoveImpl {...args} />
    </Suspense>
  )
}

export function MoveImpl({ params }: Route.ComponentProps) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion
  const { state: pokemonName } = useLocation() as Location<string | null>

  const { data: move } = useGetMoveSuspended(params.name)

  return (
    <div className="flex flex-col gap-4">
      <StyledLink to={pokemonName ? `/pokemon/${pokemonName}` : "/pokemon"}>Back</StyledLink>

      <h1 className="text-4xl font-bold">Move: {move.name}</h1>

      <div>
        <h2 className="text-2xl font-bold mb-4">Effects</h2>

        <ul className="list-disc">
          {move.effect_entries
            .filter((entry) => entry.language.name === "en")
            .map((entry) => (
              <li key={entry.effect} className="text-lg">
                {entry.effect}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
