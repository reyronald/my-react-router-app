import type { PokemonType } from "~/server/api"
import type { Route } from "./+types/pokemon"

export async function loader({ params: { name } }: Route.LoaderArgs) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion
  const data = (await res.json()) as Promise<PokemonType>
  return Response.json(data)
}
