import { screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { createRoutesStub } from "react-router"
import { server } from "tests/mocks"
import { renderWithProviers } from "tests/setup/utils"
import { describe, it } from "vitest"
import { type Route } from "./+types/Pokemon"
import Pokemon from "./Pokemon"

describe("Pokemon", () => {
  it("renders loading and succesful state", async () => {
    server.use(
      http.get("/api/pokemon/bulbasaur", () => {
        const data = {
          name: "bulbasaur",
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          },
          abilities: [
            {
              ability: {
                name: "overgrow",
                url: "",
              },
            },
            {
              ability: {
                name: "chlorophyll",
                url: "",
              },
            },
          ],
          moves: [
            {
              move: {
                name: "razor-wind",
                url: "",
              },
            },
          ],
        }

        return HttpResponse.json(data)
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
  })
})
