import type { PokemonType } from "~/server/api"

export function getDummyPokemon(): PokemonType {
  return {
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
}
