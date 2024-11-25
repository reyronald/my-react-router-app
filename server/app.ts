import "react-router"
import { createRequestHandler } from "@react-router/express"
import express from "express"
import morgan from "morgan"
import compression from "compression"

declare module "react-router" {
  interface AppLoadContext {
    VALUE_FROM_EXPRESS: string
  }
}

export const app = express()

export default app

app.use((req, res, next) => {
  const correlationId = crypto.randomUUID()
  req.headers["x-correlation-id"] = correlationId
  res.set("x-correlation-id", correlationId)
  next()
})

app.disable("x-powered-by")
app.use(compression())
app.use(morgan("tiny"))

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express",
      }
    },
  }),
)
