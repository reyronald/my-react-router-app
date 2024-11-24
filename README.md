# My React Router v7 App!

Architecture patterns to figure out:

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
- [x] Layout
- [ ] Storybook
- [ ] Testing with Vitest
  - [ ] MSW
- [ ] Data mutations
  - [ ] useFetcher
  - [ ] Forms
    - [ ] React Router <Form />
    - [ ] React Hook Form
    - [ ] Conform
    - [ ] CSRF
  - [ ] Optimistic updates
  - [ ] Input validation with Zod
- [ ] Auth
- [ ] Logging
- [ ] Middlewares
- [ ] Database ORM
- [ ] Linting
- [ ] Formatting
- [ ] CI
  - [ ] Prevent PRs from being merged with formatting and lint errors. Don't use precommit hooks
  - [ ] Don't run CI checks unless label is included
  - [ ] Bundle size checker
- [ ] Internationalization
- [ ] SEO
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
