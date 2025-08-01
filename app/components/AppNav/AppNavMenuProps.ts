import { type JSX, type MouseEventHandler } from "react"

export type AppNavMenuItem = {
  title: string
  to: string
  onClick?: MouseEventHandler<HTMLElement>
  children?: Array<
    | JSX.Element
    | {
        title: string
        to: string
        onClick?: MouseEventHandler<HTMLElement>
      }
  >
}

export type AppNavMenuProps = {
  items: AppNavMenuItem[]
  user: {
    fullName: string
    email: string
    sponsorName: string
    items: Array<{ title: string; to: string; onClick?: MouseEventHandler<HTMLElement> }>
  } | null
}
