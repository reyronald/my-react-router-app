import { screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { createRoutesStub } from "react-router"
import { server } from "tests/mocks"
import { getDummyPokemon } from "tests/mocks/pokemon"
import { renderWithProviers } from "tests/setup/utils"
import { describe, it } from "vitest"
import type { Route } from "./+types/Pokemon"
import Pokemon from "./Pokemon"

describe("Pokemon", () => {
  it("renders loading and succesful state", async () => {
    server.use(
      http.get("/api/pokemon/bulbasaur", () => {
        return HttpResponse.json(getDummyPokemon())
      }),
      http.get("/api/pokemon/bulbasaur/comments", () => {
        return HttpResponse.json({ json: [] })
      }),
    )

    const Stub = createRoutesStub([
      {
        id: "pokemon",
        path: "/pokemon/:name",
        Component() {
          const props = {
            params: {
              name: "bulbasaur",
            },
          } as Route.ComponentProps
          return <Pokemon {...props} />
        },
      },
    ])

    renderWithProviers(<Stub initialEntries={["/pokemon/bulbasaur"]} />)

    await screen.findByText("Loading...")

    await screen.findByRole("link", { name: "Back" })
    await screen.findByRole("heading", { name: "bulbasaur" })

    await screen.findByText("Abilities")
    await screen.findByText("overgrow")
    await screen.findByText("chlorophyll")

    await screen.findByText("Moves")
    await screen.findByText("razor-wind")

    await screen.findByRole("heading", { name: "Comments" })
    await screen.findByText("No comments yet.")
  })

  it("renders error state", async () => {
    server.use(
      http.get("/api/pokemon/bulbasaur", () => {
        return HttpResponse.error()
      }),
      http.get("/api/pokemon/bulbasaur/comments", () => {
        return HttpResponse.json({ json: [] })
      }),
    )

    const Stub = createRoutesStub([
      {
        id: "pokemon",
        path: "/pokemon/:name",
        Component() {
          const props = {
            params: {
              name: "bulbasaur",
            },
          } as Route.ComponentProps
          return <Pokemon {...props} />
        },
      },
    ])

    renderWithProviers(<Stub initialEntries={["/pokemon/bulbasaur"]} />)

    await screen.findByText("Loading...")

    await screen.findByRole("heading", { name: "Error" })
    await screen.findByText("Failed to fetch")
    await screen.findByRole("link", { name: "Go to the home page" })
  })
})
