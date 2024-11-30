import type { QueryClient} from "@tanstack/react-query";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetMove = (name: string) => {
  const query = useQuery({
    queryKey: useGetMove.queryKey(name),
    queryFn: async () => {
      const data = await api.getMove(name)
      return data
    },
  })

  return query
}

useGetMove.queryKey = (name: string) => ["move", name]

export const useGetMoveSuspended = (name: string) => {
  const query = useSuspenseQuery({
    queryKey: useGetMove.queryKey(name),
    queryFn: async () => {
      const data = await api.getMove(name)
      return data
    },
  })

  return query
}

export const prefetchMove = (queryClient: QueryClient, name: string) => {
  return queryClient.prefetchQuery({
    queryKey: useGetMove.queryKey(name),
    queryFn: () => api.getMove(name),
  })
}
