import { Outlet } from "react-router"

export default function Layout() {
  return (
    <div className="flex w-[900px] mx-auto mt-4">
      <Outlet />
    </div>
  )
}
