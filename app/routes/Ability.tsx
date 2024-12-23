import type { Location } from "react-router"
import { useLocation } from "react-router"
import { Centered } from "~/components/Centered/Centered"
import { ErrorBoundaryImpl } from "~/components/ErrorBoundaryImpl/ErrorBoundaryImpl"
import { StyledLink } from "~/components/StyledLink/StyledLink"
import { useGetAbility } from "~/queries/ability"
import type { Route } from "./+types/Ability"

// If you are fetching on render with React Query, you can use the meta function
// to preload the data a bit earlier with a <link rel="preload"> tag.
// This will save about 20-30ms at a minimum and even more in some other cases.
// The downside is that for renders where React Query doesn't fetch anything
// because of pre-existing cached data, the browser will complain that you preloaded
// a resource that wasn't used. This is a tradeoff you'll have to consider.

// If you're using a client loader instead of React Query
// this pattern is not useful because the loader gets called before
// the render and the performance optimization is neglible (about 1-3 ms in my testing)

export const meta: Route.MetaFunction = ({ params }) => {
  // If we had access to the QueryClient here we could check its cache
  // to see whether we should preload or not, but I don't think that's possible (?).

  return [
    {
      tagName: "link",
      rel: "preload",
      href: `https://pokeapi.co/api/v2/ability/${params.name}`,
      as: "fetch",
      crossOrigin: "anonymous", // or "use-credentials" depending on your needs
    },
  ]
}

export default function Ability({ params }: Route.ComponentProps) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion
  const { state: pokemonName } = useLocation() as Location<string | null>

  const { isPending, error, data: ability } = useGetAbility(params.name)

  if (isPending) return <Centered>Loading...</Centered>

  if (error) return <ErrorBoundaryImpl error={error} />

  return (
    <div className="flex flex-col gap-4">
      <StyledLink to={pokemonName ? `/pokemon/${pokemonName}` : "/pokemon"}>Back</StyledLink>

      <h1 className="text-4xl font-bold">Ability: {ability.name}</h1>

      <div>
        <h2 className="text-2xl font-bold mb-4">Effects</h2>

        <ul className="list-disc">
          {ability.effect_entries
            .filter((entry) => entry.language.name === "en")
            .map((entry) => (
              <li key={entry.effect} className="text-lg">
                {entry.effect}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
