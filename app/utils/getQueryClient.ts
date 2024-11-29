import { QueryClient, type QueryClientConfig } from "@tanstack/react-query"
import deepmerge from "deepmerge"

export function getQueryClient(overrideConfig?: QueryClientConfig) {
  const defaultConfig: QueryClientConfig = {
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  }

  const config = overrideConfig ? deepmerge(defaultConfig, overrideConfig) : defaultConfig
  const queryClient = new QueryClient(config)
  return queryClient
}
