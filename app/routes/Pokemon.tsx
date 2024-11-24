import { dehydrate, QueryClient } from "@tanstack/react-query"
import { MyLink } from "~/components/MyLink/MyLink"
import { Route } from "./+types/Pokemon"
import { Centered } from "~/components/Centered/Centered"
import { prefetchPokemon, useGetPokemon } from "~/queries/pokemon"

// In this component, we have both a server loader and a client loader.
// On a full page load, the server loader executes but not on client-side navigations.
// On initial page load we're rehydrating the React Query cache with the data from the server
// and we use that cache for client-side navigations from that point on, that's why
// we're only relying on the server loader once per page load.

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient()

  await prefetchPokemon(queryClient, params.name)

  return { dehydratedState: dehydrate(queryClient) }
}

// Empty client loader so that we don't trigger the server loader on client-side navigation
// and let React Query handle the data fetching in the browser
export async function clientLoader(_: Route.ClientLoaderArgs) {}

export default function Pokemon({ params }: Route.ComponentProps) {
  const { isPending, error, data } = useGetPokemon(params.name)

  if (isPending) return <Centered>Loading...</Centered>

  if (error)
    return (
      <Centered>
        <span className="text-red-500">Error: {error.message}</span>
      </Centered>
    )

  return (
    <div className="flex justify-start my-12 mx-64">
      <div className="flex flex-col gap-4">
        <MyLink to="/pokemon">Back</MyLink>

        <h1 className="text-4xl font-bold mb-16">{data.name}</h1>

        <img
          src={data.sprites.front_default}
          alt={data.name}
          width={96}
          height={96}
          className="w-48 h-48 mx-auto"
        />

        <p>Abilities</p>

        <ul>
          {data.abilities.map((ability) => (
            <li key={ability.ability.name}>
              <MyLink to={`/ability/${ability.ability.name}`} state={data.name}>
                {ability.ability.name}
              </MyLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
