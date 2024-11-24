import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),

  route("/pokemon", "routes/PokemonList.tsx"),
  route("/pokemon/:name", "routes/Pokemon.tsx"),

  route("/ability/:name", "routes/Ability.tsx"),

  route("/move/:name", "routes/Move.tsx"),
] satisfies RouteConfig
