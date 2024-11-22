import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),

  route("/pokemon", "routes/PokemonList.tsx"),
  route("/pokemon/:name", "routes/Pokemon.tsx"),
] satisfies RouteConfig
