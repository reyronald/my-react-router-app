import { dehydrate, QueryClient } from "@tanstack/react-query"
import { useLocation, Location } from "react-router"
import { MyLink } from "~/components/MyLink/MyLink"
import { prefetchMove, useGetMoveSuspended } from "~/queries/move"
import { Route } from "./+types/Move"
import { Suspense } from "react"
import { Centered } from "~/components/Centered/Centered"

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient()

  await prefetchMove(queryClient, params.name)

  return { dehydratedState: dehydrate(queryClient) }
}

export async function clientLoader(_: Route.ClientLoaderArgs) {}

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
  const { state: pokemonName } = useLocation() as Location<string | null>

  const { data: move } = useGetMoveSuspended(params.name)

  return (
    <div className="flex justify-start my-12 mx-64">
      <div className="flex flex-col gap-4">
        <MyLink to={pokemonName ? `/pokemon/${pokemonName}` : "/pokemon"}>Back</MyLink>

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
    </div>
  )
}
