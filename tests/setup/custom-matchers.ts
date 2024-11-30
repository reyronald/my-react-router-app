/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { expect } from "vitest"

import "@testing-library/jest-dom/vitest"

expect.extend({})

interface CustomMatchers<R = unknown> {
  toBeFoo: () => R
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
