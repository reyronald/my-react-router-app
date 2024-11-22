import { Link } from "react-router"

export function MyLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link className="text-blue-500 hover:underline" to={to}>
      {children}
    </Link>
  )
}
