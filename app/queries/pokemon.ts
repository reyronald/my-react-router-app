import { QueryClient, useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const pokemonQuery = {
  queryKey: (name: string) => ["pokemon", name],

  usePokemon: (name: string) => {
    const query = useQuery({
      queryKey: pokemonQuery.queryKey(name),
      queryFn: async () => {
        const data = await api.getPokemon(name)
        return data
      },
    })

    return query
  },

  prefetchPokemon: (queryClient: QueryClient, name: string) => {
    return queryClient.prefetchQuery({
      queryKey: pokemonQuery.queryKey(name),
      queryFn: () => api.getPokemon(name),
    })
  },
}
