import { db } from "~/lib/prisma/prisma"

export const commentsDb = {
  getComment: async (name: string) => {
    const comments = await db.comment.findMany({
      where: { pokemonName: name },
      orderBy: { createdAt: "asc" },
    })

    return comments
  },
}
