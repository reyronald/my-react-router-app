import { useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetAbility = (name: string) => {
  const query = useQuery({
    queryKey: useGetAbility.queryKey(name),
    queryFn: async () => {
      const data = await api.getAbility(name)
      return data
    },
  })

  return query
}

useGetAbility.queryKey = (name: string) => ["ability", name]
