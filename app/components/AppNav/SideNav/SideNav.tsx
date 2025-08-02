import { clsx } from "clsx"
import { useId } from "react"
import Offcanvas from "react-bootstrap/Offcanvas"

import styles from "./SideNav.module.css"

import { ChevronDown, Mountain, UserRound, X } from "lucide-react"
import type { AppNavMenuProps } from "~/components/AppNav/AppNavMenuProps"
import { CircleQuestionMark } from "~/components/AppNav/CircleQuestionMark"
import { useToggler } from "~/hooks/useToggler"

export function SideNav({ items, user }: AppNavMenuProps) {
  const [show, toggleShow] = useToggler()

  const canvasId = useId()
  const detailsName = useId()

  useCloserOffcanvasOnNavigation(show, toggleShow)

  const logo = (
    <a href="/" aria-label={"GO_HOME"}>
      <Mountain size={32} />
    </a>
  )

  return (
    <nav className={styles.sideNav}>
      <div className="container">
        <button
          type="button"
          aria-label={"OPEN_MENU"}
          aria-controls={canvasId}
          onClick={toggleShow}
          className={styles.menuButton}
        >
          <HamburgerIcon />
        </button>

        {logo}

        <Offcanvas id={canvasId} show={show} onHide={toggleShow} className={styles.offcanvas}>
          <Offcanvas.Header>
            <div className={styles.logoContainer}>{logo}</div>

            <button type="button" className={styles.canvasClose} onClick={toggleShow}>
              <X />
            </button>
          </Offcanvas.Header>

          <Offcanvas.Body className={styles.offcanvasBody}>
            {user && (
              <ul className={styles.menuUl}>
                {items.map((item) => (
                  <li key={item.title} className={styles.menuLi}>
                    {item.children && item.children.length > 0 ? (
                      <details
                        className={styles.menuItemDetails}
                        name={detailsName}
                        aria-label={item.title}
                      >
                        <summary>
                          {item.title}
                          <ChevronDown className={styles.icon} />
                        </summary>

                        <ul className={styles.menuUl}>
                          {item.children.map((child) =>
                            "to" in child ? (
                              <li key={child.title} className={styles.subMenuLi}>
                                <a href={child.to} onClick={child.onClick}>
                                  {child.title}
                                </a>
                              </li>
                            ) : (
                              child
                            ),
                          )}
                        </ul>
                      </details>
                    ) : (
                      <div className={styles.menuItem}>
                        <a href={item.to} key={item.title} onClick={item.onClick}>
                          {item.title}
                        </a>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <ul className={styles.menuUl}>
              <li className={styles.menuLi}>
                <details
                  className={clsx(styles.menuItemDetails, styles.helpMenuItemDetails)}
                  name={detailsName}
                >
                  <summary>
                    <div className={styles.menuWithIcon}>
                      <CircleQuestionMark />
                      Get Help
                    </div>
                    <ChevronDown className={styles.icon} />
                  </summary>

                  <p>Coming soon</p>
                </details>
              </li>

              {user && (
                <li className={styles.menuLi}>
                  <details className={styles.menuItemDetails} name={detailsName}>
                    <summary>
                      <div className={styles.menuWithIcon}>
                        <UserRound />
                        {user.fullName}
                      </div>
                      <ChevronDown className={styles.icon} />
                    </summary>

                    <ul className={clsx(styles.menuUl, styles.utilityMenuUl)}>
                      <li className={styles.subMenuLi}>
                        <div>
                          <div>{user.sponsorName}</div>
                          <div className={styles.email}>{user.email}</div>
                        </div>
                      </li>

                      {user.items.map((item) => (
                        <li key={item.title} className={styles.subMenuLi}>
                          <a href={item.to} onClick={item.onClick}>
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  )
}

function useCloserOffcanvasOnNavigation(show: boolean, toggleShow: () => void) {
  // const location = useLocation()
  // const prevPathnameRef = useRef(location.pathname)
  // useEffect(() => {
  //   if (prevPathnameRef.current !== location.pathname && show) {
  //     toggleShow()
  //   }
  //   prevPathnameRef.current = location.pathname
  // }, [location.pathname, show, toggleShow])
}

function HamburgerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8H25M7 16H25M7 24H12.5H18" stroke="#202223" />
    </svg>
  )
}
