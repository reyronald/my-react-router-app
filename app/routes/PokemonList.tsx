import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { MyLink } from "~/components/MyLink/MyLink"
import { api } from "~/server/api"
import { Route } from "./+types/PokemonList"
import { prefetchPokemon } from "~/queries/pokemon"

// In this component, we only have a server loader and no rehydration of React Query in the client.
// This means that on every navigation to this page, regardless of whether it is a full page load
// or a client-side navigation, the server will always fetch the data before the markup is sent to the client.

export async function loader(_: Route.LoaderArgs) {
  const pokemonList = await api.getPokemonList()
  return pokemonList
}

export default function PokemonList({ loaderData }: Route.ComponentProps) {
  const query = useQueryClient()

  useEffect(() => {
    for (const pokemon of loaderData.results) {
      prefetchPokemon(query, pokemon.name)
    }
  }, [])

  return (
    <div className="flex h-screen justify-center my-12">
      <div>
        <h1 className="text-4xl font-bold mb-16">Pokemon List</h1>

        <ul>
          {loaderData.results.map((pokemon) => (
            <li key={pokemon.name}>
              <MyLink to={`/pokemon/${pokemon.name}`}>{pokemon.name}</MyLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
