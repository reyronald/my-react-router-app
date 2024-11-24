import { dehydrate, QueryClient } from "@tanstack/react-query"
import { MyLink } from "~/components/MyLink/MyLink"
import { Route } from "./+types/Pokemon"
import { prefetchPokemon, usePokemon } from "~/queries/pokemon"

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient()

  await prefetchPokemon(queryClient, params.name)

  return { dehydratedState: dehydrate(queryClient) }
}

// Empty client loader so that we don't trigger the server loader on client-side navigation
// and let React Query handle the data fetching in the browser
export async function clientLoader(_: Route.ClientLoaderArgs) {}

export default function Pokemon({ params }: Route.ComponentProps) {
  const { isPending, error, data } = usePokemon(params.name)

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
