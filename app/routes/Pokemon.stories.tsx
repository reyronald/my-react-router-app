import { type Meta, type StoryObj } from "@storybook/react"
import { DehydratedState } from "@tanstack/react-query"
import { http, HttpResponse } from "msw"
import { createRoutesStub } from "react-router"
import { Info } from "./+types/Pokemon"
import Pokemon from "./Pokemon"

const dehydratedState = {
  mutations: [],
  queries: [],
} satisfies DehydratedState

const meta = {
  component: Pokemon,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/pokemon/bulbasaur", () => {
          return HttpResponse.json({
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
          })
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex w-[500px] mx-auto mt-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Pokemon>

export default meta

type Story = StoryObj<typeof meta>

export const RouteErrorResponse = {
  decorators: [
    function reactRouterDecorator(Story, context) {
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: Story,
          loader: (): Info["loaderData"] => {
            return { dehydratedState }
          },
        },
      ])
      return <Stub />
    },
  ],
  args: {
    params: { name: "bulbasaur" },
    loaderData: { dehydratedState },
    matches: [
      {
        params: {},
        id: "root",
        pathname: "string",
        data: undefined,
        handle: undefined,
      },
      {
        params: {},
        id: "routes/Layout",
        pathname: "string",
        data: undefined,
        handle: undefined,
      },
    ],
  },
} satisfies Story
