import { commentsDb } from "~/domain/comments/comments.db"
import type { Route } from "./+types/pokemon"

export async function loader({ params: { name } }: Route.LoaderArgs) {
  const comments = await commentsDb.getComment(name)
  return Response.json(comments)
}
