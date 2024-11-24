import { Link, LinkProps } from "react-router"

export function StyledLink({ className, ...rest }: LinkProps) {
  return <Link className="text-blue-500 hover:underline" prefetch="intent" {...rest}></Link>
}
