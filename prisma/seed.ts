import { PrismaClient, type Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const commentData: Prisma.CommentCreateInput[] = [
  {
    pokemonName: "bulbasaur",
    author: "Ronald Rey",
    content: "Lorem ipsum dolor sit amet",
  },
  {
    pokemonName: "charmander",
    author: "John Smith",
    content: "The declaration of independence",
  },
]

async function main() {
  console.log(`Start seeding ...`)

  for (const data of commentData) {
    const comment = await prisma.comment.create({ data })
    console.log(`Created comment with id: ${comment.id.toString()}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e: unknown) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })