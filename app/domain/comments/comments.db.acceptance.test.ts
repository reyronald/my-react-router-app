import { describe, expect, it } from "vitest"
import { db } from "~/lib/prisma/prisma"
import { commentsDb } from "./comments.db"

describe("app/domain/comments/comments.db.ts", () => {
  it("should return comments for a given pokemon name", async () => {
    // Arrange
    const mockComments = [
      {
        pokemonName: "Pikachu",
        content: "Great!",
        author: "John Smith",
      },
      {
        pokemonName: "Pikachu",
        content: "Awesome!",
        author: "Mary Jane",
      },
    ]

    await db.comment.createMany({ data: mockComments })

    // Act
    const result = await commentsDb.getComment("Pikachu")

    // Assert
    expect(result).toStrictEqual([
      {
        id: 1,
        pokemonName: "Pikachu",
        content: "Great!",
        author: "John Smith",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      {
        id: 2,
        pokemonName: "Pikachu",
        content: "Awesome!",
        author: "Mary Jane",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    ])
  })
})
