import { dehydrate, QueryClient } from "@tanstack/react-query"
import { MyLink } from "~/components/MyLink/MyLink"
import { pokemonQuery } from "~/queries/pokemon"
import { Route } from "./+types/Pokemon"

export async function loader({ request, params }: Route.LoaderArgs) {
  const queryClient = new QueryClient()

  // Only prefetch if the request is not from a navigation.
  // Otherwise, we'll the browser do it from React Query
  if (request.headers.get("referer") === null) {
    await pokemonQuery.prefetchPokemon(queryClient, params.name)
  }

  return { dehydratedState: dehydrate(queryClient) }
}

export default function Pokemon({ params }: Route.ComponentProps) {
  const { isPending, error, data } = pokemonQuery.usePokemon(params.name)

  if (isPending) return <div className="flex h-screen items-center justify-center">Loading...</div>

  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error.message}
      </div>
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
      </div>
    </div>
  )
}
