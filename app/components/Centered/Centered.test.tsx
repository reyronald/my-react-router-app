import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Centered } from "./Centered"

describe("Centered", () => {
  it("renders children", () => {
    render(<Centered>test</Centered>)
    expect(screen.getByText("test")).toBeInTheDocument()
  })
})
