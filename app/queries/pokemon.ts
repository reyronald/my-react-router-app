import { QueryClient, useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const usePokemon = (name: string) => {
  const query = useQuery({
    queryKey: usePokemon.queryKey(name),
    queryFn: async () => {
      const data = await api.getPokemon(name)
      return data
    },
  })

  return query
}

usePokemon.queryKey = (name: string) => ["pokemon", name]

export const prefetchPokemon = (queryClient: QueryClient, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: usePokemon.queryKey(name),
    queryFn: () => api.getPokemon(name),
  })
}
