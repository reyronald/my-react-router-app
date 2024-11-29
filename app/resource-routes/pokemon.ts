import { Route } from "./+types/pokemon"

export async function loader({ params: { name } }: Route.LoaderArgs) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await res.json()
  return Response.json(data)
}
