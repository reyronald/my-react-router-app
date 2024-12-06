import { useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetAbility = (name: string) => {
  const query = useQuery({
    queryKey: getAbilityQueryKey(name),
    queryFn: async () => {
      const data = await api.getAbility(name)
      return data
    },
  })

  return query
}

const getAbilityQueryKey = (name: string) => ["ability", name]
