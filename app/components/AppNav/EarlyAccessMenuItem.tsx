import { ChevronRightCircle } from "lucide-react"
import { Badge } from "react-bootstrap"

import styles from "./EarlyAccessMenuItem.module.css"

export function EarlyAccessMenuItem() {
  return (
    <div className={styles.earlyAccessBanner}>
      <Badge>Early access</Badge>
      <div className="h4">Header</div>
      <div className="body-small">Description</div>
      <div>
        <a href="/bills">
          {"Link text"} <ChevronRightCircle />
        </a>
      </div>
    </div>
  )
}
