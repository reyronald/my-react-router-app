import type { QueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetPokemon = (name: string) => {
  const query = useQuery({
    queryKey: GetPokemonQueryKey(name),
    queryFn: async () => {
      const data = await api.getPokemon(name)
      return data
    },
  })

  return query
}

const GetPokemonQueryKey = (name: string) => ["pokemon", name]

export const prefetchPokemon = (queryClient: QueryClient, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: GetPokemonQueryKey(name),
    queryFn: () => api.getPokemon(name),
  })
}
