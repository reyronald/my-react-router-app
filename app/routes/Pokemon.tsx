import { dehydrate, QueryClient } from "@tanstack/react-query"
import { Centered } from "~/components/Centered/Centered"
import { ErrorBoundaryImpl } from "~/components/ErrorBoundaryImpl/ErrorBoundaryImpl"
import { StyledLink } from "~/components/StyledLink/StyledLink"
import {
  prefetchPokemon,
  prefetchPokemonComments,
  useGetPokemon,
  useGetPokemonComments,
} from "~/queries/pokemon"
import type { Route } from "./+types/Pokemon"

// In this component, we have both a server loader and a client loader.
// On an initial page load, the server loader executes but not on client-side navigations.
// On initial page load we're rehydrating the React Query cache with the data from the server
// and we use that cache for client-side navigations from that point on, that's why
// we're only relying on the server loader once per page load.

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient()

  await Promise.all([
    prefetchPokemon(queryClient, params.name),
    prefetchPokemonComments(queryClient, params.name),
  ])

  return { dehydratedState: dehydrate(queryClient) }
}

export function clientLoader(_: Route.ClientLoaderArgs) {
  // Empty client loader so that we don't trigger the server loader on client-side
  // navigation and let React Query handle the data fetching in the browser
}

export default function Pokemon({ params }: Route.ComponentProps) {
  const { isPending, error, data: pokemon } = useGetPokemon(params.name)
  const {
    isPending: isPendingPokemonComments,
    error: errorPokemonComments,
    data: pokemonComments,
  } = useGetPokemonComments(params.name)

  if (isPending || isPendingPokemonComments) return <Centered>Loading...</Centered>

  if (error || errorPokemonComments) return <ErrorBoundaryImpl error={error} />

  return (
    <div className="w-full space-y-10">
      <StyledLink to="/pokemon">Back</StyledLink>

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold mb-16">{pokemon.name}</h1>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={96}
            height={96}
            className="w-48 h-48 mx-auto"
          />

          <p className="text-xl font-bold">Abilities</p>

          <ul className="list-disc pl-8">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>
                <StyledLink to={`/ability/${ability.ability.name}`} state={pokemon.name}>
                  {ability.ability.name}
                </StyledLink>
              </li>
            ))}
          </ul>

          <p className="text-xl font-bold">Moves</p>

          <ul className="list-disc pl-8">
            {pokemon.moves.map((move) => (
              <li key={move.move.name}>
                <StyledLink to={`/move/${move.move.name}`} state={pokemon.name}>
                  {move.move.name}
                </StyledLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold ">Comments</h2>

          <ul className="mt-4">
            {pokemonComments.map((comment) => (
              <li key={comment.id} className="mb-4">
                <p className="text-lg font-bold">{comment.author}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-gray-400 text-sm">{comment.createdAt.toString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
