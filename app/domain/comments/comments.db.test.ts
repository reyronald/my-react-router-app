import { describe, expect, it, vi } from "vitest"
import { db } from "~/lib/prisma/prisma"
import { commentsDb } from "./comments.db"

describe("commentsDb.getComment", () => {
  it("should return comments for a given pokemon name", async () => {
    // Arrange
    const mockComments = [
      {
        id: 1,
        pokemonName: "Pikachu",
        content: "Great!",
        author: "John Smith",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        pokemonName: "Pikachu",
        content: "Awesome!",
        author: "Mary Jane",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    const findManySpy = vi.spyOn(db.comment, "findMany").mockResolvedValueOnce(mockComments)

    // Act
    const result = await commentsDb.getComment("Pikachu")

    // Assert
    expect(result).toStrictEqual(mockComments)
    expect(findManySpy).toHaveBeenCalledWith({
      where: { pokemonName: "Pikachu" },
      orderBy: { createdAt: "asc" },
    })
  })
})
