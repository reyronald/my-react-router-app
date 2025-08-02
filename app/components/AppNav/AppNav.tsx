import "bootstrap/dist/css/bootstrap.min.css"

import type { AppNavMenuProps } from "~/components/AppNav/AppNavMenuProps"
import { SideNav } from "~/components/AppNav/SideNav/SideNav"
import { SkipToContent } from "~/components/AppNav/SkipToContent"
import { TopPriorityNav } from "~/components/AppNav/TopPriorityNav/TopPriorityNav"

export function AppNavMenu({ items, user }: AppNavMenuProps) {
  return (
    <>
      <SkipToContent />

      <div className="d-lg-none">
        <SideNav items={items} user={user} />
      </div>

      <div className="d-none d-lg-block">
        <TopPriorityNav items={items} user={user} />
      </div>
    </>
  )
}
