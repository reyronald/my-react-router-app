import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { StyledLink } from "~/components/StyledLink/StyledLink"
import { api } from "~/server/api"
import type { Route } from "./+types/PokemonList"
import { prefetchPokemon } from "~/queries/pokemon"

// In this component, we only have a server loader and no rehydration of React Query in the client.
// This means that on every navigation to this page, regardless of whether it is an initial page load
// or a client-side navigation, the server will always fetch the data before the markup is sent to the client.
//
// Some times this is a preferred behavior if we're trying to minimze showing loading states to the user
// when transitioning from one page to another.

export async function loader(_: Route.LoaderArgs) {
  const pokemonList = await api.getPokemonList()
  return pokemonList
}

export default function PokemonList({ loaderData }: Route.ComponentProps) {
  const query = useQueryClient()

  useEffect(() => {
    for (const pokemon of loaderData.results) {
      void prefetchPokemon(query, pokemon.name)
    }
  }, [query, loaderData.results])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-16">Pokemon List</h1>

      <ul>
        {loaderData.results.map((pokemon) => (
          <li key={pokemon.name}>
            <StyledLink to={`/pokemon/${pokemon.name}`}>{pokemon.name}</StyledLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
