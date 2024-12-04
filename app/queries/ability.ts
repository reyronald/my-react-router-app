import { useQuery } from "@tanstack/react-query"
import { api } from "~/server/api"

export const useGetAbility = (name: string) => {
  const query = useQuery({
    queryKey: GetAbilityQueryKey(name),
    queryFn: async () => {
      const data = await api.getAbility(name)
      return data
    },
  })

  return query
}

const GetAbilityQueryKey = (name: string) => ["ability", name]
