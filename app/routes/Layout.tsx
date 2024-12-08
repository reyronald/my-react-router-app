import { Outlet } from "react-router"

export default function Layout() {
  return (
    <div className="flex w-[700px] mx-auto my-8">
      <Outlet />
    </div>
  )
}
