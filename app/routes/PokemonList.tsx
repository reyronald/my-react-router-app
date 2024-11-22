import { api } from "~/server/api"
import { Route } from "./+types/PokemonList"
import { MyLink } from "~/components/MyLink/MyLink"

export async function loader({ params }: Route.LoaderArgs) {
  const pokemonList = await api.getPokemonList()
  return pokemonList
}

export default function PokemonList({ loaderData }: Route.ComponentProps) {
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
