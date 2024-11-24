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
}

export const api = {
  async getPokemonList(): Promise<PokemonList> {
    const search = new URLSearchParams([["limit", "10"]]).toString()
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?${search}`)
    return res.json()
  },
  async getPokemon(name: string): Promise<PokemonType> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return res.json()
  },
}
