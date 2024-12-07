import { z } from "zod"

const schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"] as const),
  SOME_CONFIG_VALUE: z.string(),
  LOGGING_THRESHOLD: z.enum(["error", "warn", "info", "debug"] as const),
  DATABASE_URL: z.string(),
  PRISMA_QUERY_LOG: z.enum(["true", "false"]).optional(),
})

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors)

  throw new Error("Invalid environment variables. See terminal for details.")
}

/**
 * Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getClientEnv() {
  return {
    MODE: process.env.NODE_ENV,
    SOME_CONFIG_VALUE: process.env.SOME_CONFIG_VALUE,
  }
}

type CLIENT_ENV = ReturnType<typeof getClientEnv>

declare global {
  interface Window {
    ENV: CLIENT_ENV
  }
}
