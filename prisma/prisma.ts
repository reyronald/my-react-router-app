import { remember } from "@epic-web/remember"
import { PrismaClient } from "@prisma/client"
import chalk from "chalk"
import { createPrismaQueryEventHandler } from "prisma-query-log"
import { color, colorizeSQLQuery } from "./colorizeSQLQuery"

let _queryLoggerEnabled = true

export const enablePrismaQueryLogger = () => (_queryLoggerEnabled = true)

export const disablePrismaQueryLogger = () => (_queryLoggerEnabled = false)

export const db = remember("db", () => {
  const db = new PrismaClient({
    errorFormat: process.env.NODE_ENV === "production" ? "colorless" : "pretty",
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
  })

  db.$on("query", (e) => {
    const logThreshold = 20

    const durationColor =
      e.duration < logThreshold * 1.1
        ? "green"
        : e.duration < logThreshold * 1.2
        ? "blue"
        : e.duration < logThreshold * 1.3
        ? "yellow"
        : e.duration < logThreshold * 1.4
        ? "redBright"
        : "red"
    const dur = chalk[durationColor](`${e.duration.toString()}ms`)

    createPrismaQueryEventHandler({
      format: true,
      logger: (query) => {
        if (!_queryLoggerEnabled) return

        // @todo print query duration
        const queryColored = colorizeSQLQuery(query)
        console.log(color.blue("prisma:query") + ` - ${dur}`)
        console.log(queryColored)
      },
    })(e)
  })

  return db
})
