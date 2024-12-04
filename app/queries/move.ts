import type { QueryClient } from "@tanstack/react-query"
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetMove = (name: string) => {
  const query = useQuery({
    queryKey: getMoveQueryKey(name),
    queryFn: async () => {
      const data = await api.getMove(name)
      return data
    },
  })

  return query
}

const getMoveQueryKey = (name: string) => ["move", name]

export const useGetMoveSuspended = (name: string) => {
  const query = useSuspenseQuery({
    queryKey: getMoveQueryKey(name),
    queryFn: async () => {
      const data = await api.getMove(name)
      return data
    },
  })

  return query
}

export const prefetchMove = (queryClient: QueryClient, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: getMoveQueryKey(name),
    queryFn: () => api.getMove(name),
  })
}
