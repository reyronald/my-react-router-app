import type { QueryClient} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetPokemon = (name: string) => {
  const query = useQuery({
    queryKey: useGetPokemon.queryKey(name),
    queryFn: async () => {
      const data = await api.getPokemon(name)
      return data
    },
  })

  return query
}

useGetPokemon.queryKey = (name: string) => ["pokemon", name]

export const prefetchPokemon = (queryClient: QueryClient, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: useGetPokemon.queryKey(name),
    queryFn: () => api.getPokemon(name),
  })
}
