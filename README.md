# My React Router v7 App!

Architecture patterns to figure out:

- [x] Layout
- [x] Data Fetching
  - [x] Server loaders
  - [x] Client loaders
  - [x] Server loaders + Client loaders
  - [x] Link module preloading
  - [x] Resource preloading
  - [x] React Query
  - [x] React Query Prefetching
  - [x] Hydration
  - [x] Suspense
  - [x] Error boundaries
- [ ] Data mutations
  - [ ] useFetcher
  - [ ] Forms
    - [ ] React Router <Form />
    - [ ] React Hook Form
    - [ ] Conform
    - [ ] CSRF
  - [ ] Optimistic updates
  - [ ] Input validation with Zod
- [ ] Navigation
  - [ ] Server navigation
  - [ ] Client navigation
  - [ ] View transitions
- [x] Storybook
  - [x] Build and deploy to Github Pages
- [x] Testing with Vitest
      See https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
  - [x] MSW
  - [ ] CI: Sharding
  - [ ] CI: GH Actions reporter
  - [ ] Acceptance
  - [ ] Cypress/Playwright
- [x] Linting
  - [x] Make sure warings fail on CI
  - [ ] React compiler eslint-plugin-react-compiler
- [x] Formatting
- [x] CI
  - [x] Prevent PRs from being merged with formatting and lint errors. Don't use
        precommit hooks
  - [x] Don't run CI checks unless label is included
  - [x] Bundle size checker
  - [x] Dangerjs
- [x] Environment variables
- [ ] Internationalization
- [ ] SEO
  - [ ] Remove trailing slashes https://authenticdigital.nz/blog/trailing-slashes-and-seo
  - [ ] Robots.txt
  - [ ] isbot
- [ ] Auth
- [ ] Logging
- [ ] Error reporting
- [ ] Middlewares
- [ ] Rate Limiting
- [ ] CORS
- [ ] Content Security Policy
- [x] Database ORM
- [ ] Consider tRPC instead of regular fetch
- [ ] Service Workers for caching files
- [ ] Web Workers

- Ronald Rey

# Welcome to React Router!

- 📖 [React Router docs](https://reactrouter.com/dev)

## Development

Run the dev server:

```shellscript
npm run dev
```

> [!NOTE]
> For the Prisma CLI commands to work you need an `.env` file in the root of the project that has the value for `DATABASE_URL`. You can do that manually and get the value from `.env.local`, or just run `cp .env.local .env`

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.
