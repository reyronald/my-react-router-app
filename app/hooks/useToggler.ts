import { useReducer } from "react"

export function useToggler(initialValue = false) {
  return useReducer((v: boolean) => !v, initialValue)
}
