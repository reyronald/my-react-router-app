import { QueryClient, useQuery } from "@tanstack/react-query"
import { MyLink } from "~/components/MyLink/MyLink"
import { api } from "~/server/api"
import { Route } from "./+types/Pokemon"

export async function loader({ params }: Route.LoaderArgs) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => api.getPokemon(params.name),
  })

  const pokemon = await api.getPokemon(params.name)

  return pokemon
}

export default function Pokemon({ params, loaderData }: Route.ComponentProps) {
  const { data } = useQuery({
    queryKey: ["pokemon"],
    queryFn: () => api.getPokemon(params.name),
    initialData: loaderData,
  })

  console.log("Pokemon", !!data)

  return (
    <div className="flex justify-start my-12 mx-64">
      <div className="flex flex-col gap-4">
        <MyLink to="/pokemon">Back</MyLink>

        <h1 className="text-4xl font-bold mb-16">{loaderData.name}</h1>

        <img
          src={loaderData.sprites.front_default}
          alt={loaderData.name}
          width={96}
          height={96}
          className="w-48 h-48 mx-auto"
        />
      </div>
    </div>
  )
}
