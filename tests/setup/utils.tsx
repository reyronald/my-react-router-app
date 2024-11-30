import { QueryClientProvider } from "@tanstack/react-query"
import { render, type RenderOptions } from "@testing-library/react"
import { getQueryClient } from "~/utils/getQueryClient"

export function renderWithProviers(ui: React.ReactNode, options?: Omit<RenderOptions, "queries">) {
  const queryClient = getQueryClient({ defaultOptions: { queries: { retry: 0 } } })

  const renderResult = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    options,
  )

  return renderResult
}
