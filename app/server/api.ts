import type { Comment } from "@prisma/client"
import superjson, { type SuperJSONResult } from "superjson"

type Pokemon = {
  name: string
  url: string
}

export type PokemonList = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export type PokemonType = {
  name: string
  sprites: {
    front_default: string
  }
  abilities: {
    ability: {
      name: string
      url: string
    }
  }[]
  moves: {
    move: {
      name: string
      url: string
    }
  }[]
}

export type EffectEntry = {
  effect: string
  short_effect: string
  language: {
    name: string
  }
}

export type Ability = {
  id: number
  name: string
  effect_entries: EffectEntry[]
  pokemon: Array<{
    is_hidden: boolean
    slot: number
    pokemon: {
      name: string
      url: string
    }
  }>
}

export type Move = {
  name: string
  accuracy: number
  pp: number
  power: number
  effect_entries: EffectEntry[]
}

export const api = {
  /* eslint-disable @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion */
  async getPokemonList(): Promise<PokemonList> {
    const search = new URLSearchParams([["limit", "10"]]).toString()
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?${search}`)
    return res.json() as Promise<PokemonList>
  },

  async getPokemon(name: string): Promise<PokemonType> {
    const res = await fetch(`/api/pokemon/${name}`)
    return res.json() as Promise<PokemonType>
  },

  async getPokemonComments(name: string): Promise<Comment[]> {
    const res = await fetch(`/api/pokemon/${name}/comments`)
    const json = (await res.json()) as SuperJSONResult
    const data = superjson.deserialize<Comment[]>(json)
    return data
  },

  async getAbility(idOrName: string): Promise<Ability> {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${idOrName}`)
    return res.json() as Promise<Ability>
  },

  async getMove(idOrName: string): Promise<Move> {
    const res = await fetch(`https://pokeapi.co/api/v2/move/${idOrName}`)
    return res.json() as Promise<Move>
  },
  /* eslint-enable @typescript-eslint/consistent-type-assertions,  @typescript-eslint/no-unsafe-type-assertion */
}
