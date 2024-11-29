import closeWithGrace from "close-with-grace"
import { setupServer } from "msw/node"
import { http, passthrough } from "msw"

const handlers = [
  http.get(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
  http.post(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
]

export const server = setupServer(...handlers)

server.listen({
  onUnhandledRequest(request, print) {
    // Do not print warnings on unhandled requests to https://<:userId>.ingest.us.sentry.io/api/
    // Note: a request handler with passthrough is not suited with this type of url
    //       until there is a more permissible url catching system
    //       like requested at https://github.com/mswjs/msw/issues/1804
    if (request.url.includes(".sentry.io")) {
      return
    }
    // Print the regular MSW unhandled request warning otherwise.
    print.warning()
  },
})

if (process.env.NODE_ENV !== "test") {
  console.info("🔶 Mock server installed")

  closeWithGrace(() => {
    server.close()
  })
}
