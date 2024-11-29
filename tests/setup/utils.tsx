import { QueryClientProvider } from "@tanstack/react-query"
import { render, type RenderOptions } from "@testing-library/react"
import { getQueryClient } from "~/utils/getQueryClient"

export function renderWithProviers(
  ui: React.ReactNode,
  options?: Omit<RenderOptions, "queries"> | undefined,
) {
  const renderResult = render(
    <QueryClientProvider client={getQueryClient()}>{ui}</QueryClientProvider>,
    options,
  )

  return renderResult
}
