import { expect } from "vitest"

import "@testing-library/jest-dom/vitest"

expect.extend({})

interface CustomMatchers<R = unknown> {}

declare module "vitest" {}
