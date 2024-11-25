/**
 * See
 * - https://github.com/remix-run/react-router-templates/tree/main/node-custom-server
 * - https://github.com/remix-run/custom-react-router-framework-example
 * - https://github.com/remix-run/examples/tree/main/socket.io
 * - https://github.com/cbcruk/maco/blob/main
 * - https://github.com/jrestall/epic-stack/tree/main
 *
 * - https://remix.run/docs/fr/main/other-api/adapter
 * - https://github.com/kiliman/remix-express-vite-plugin
 *
 * @todo
 * - Test production
 * - Restart server on file change
 */

import express from "express"

let viteDevServer =
  process.env.NODE_ENV === "production"
    ? undefined
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true, host: "localhost" },
        }),
      )

const app = express()

if (viteDevServer) {
  app.use(viteDevServer.middlewares)

  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts")
      return await source.app(req, res, next)
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error)
      }
      next(error)
    }
  })
} else {
  app.use("/assets", express.static("build/client/assets", { immutable: true, maxAge: "1y" }))

  app.use(await import("./build/index.js").then((mod) => mod.app))
}

app.use(express.static("build/client", { maxAge: "1h" }))

const port = 5173
app.listen(port, () => {
  viteDevServer.resolvedUrls = {
    local: [`http://localhost:${port}/`],
    network: [],
  }
  viteDevServer.printUrls()
  console.log()
})
