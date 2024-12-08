import type { QueryClient } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetPokemon = (name: string) => {
  const query = useQuery({
    queryKey: getPokemonQueryKey(name),
    queryFn: async () => {
      const data = await api.getPokemon(name)
      return data
    },
  })

  return query
}

const getPokemonQueryKey = (name: string) => ["pokemon", name]

export const prefetchPokemon = (queryClient: QueryClient, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: getPokemonQueryKey(name),
    queryFn: () => api.getPokemon(name),
  })
}

export const useGetPokemonComments = (name: string) => {
  const query = useQuery({
    queryKey: getPokemonCommentsQueryKey(name),
    queryFn: async () => {
      const data = await api.getPokemonComments(name)
      return data
    },
  })

  return query
}

const getPokemonCommentsQueryKey = (name: string) => ["pokemon", name, "comments"]

export const prefetchPokemonComments = (queryClient: QueryClient, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: getPokemonCommentsQueryKey(name),
    queryFn: () => api.getPokemonComments(name),
  })
}
