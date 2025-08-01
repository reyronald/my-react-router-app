import { ChevronRightCircle } from "lucide-react"
import { Badge } from "react-bootstrap"

import { Link } from "react-router"
import styles from "./EarlyAccessMenuItem.module.css"

export function EarlyAccessMenuItem() {
  return (
    <div className={styles.earlyAccessBanner}>
      <Badge>Early access</Badge>
      <div className="h4">Header</div>
      <div className="body-small">Description</div>
      <div>
        <Link href="/bills" size="sm">
          {"Link text"} <ChevronRightCircle />
        </Link>
      </div>
    </div>
  )
}
