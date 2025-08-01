import { clsx } from "clsx"
import { Dropdown } from "react-bootstrap"
import { Link } from "react-router"
import { Fragment } from "react/jsx-runtime"

import styles from "./TopPriorityNav.module.css"

import { ChevronDown } from "lucide-react"
import type { AppNavMenuProps } from "~/components/AppNav/AppNavMenuProps"
import { CircleQuestionMark } from "~/components/AppNav/CircleQuestionMark"

export function TopPriorityNav({ items, user }: AppNavMenuProps) {
  const MAX_VISIBLE_ITEMS = 4
  const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS)
  const moreItems = items.slice(MAX_VISIBLE_ITEMS)

  return (
    <nav className={styles.topPriorityNav}>
      <div className={clsx(styles.navContainer, "container")}>
        <div className={styles.logoContainer}>
          <Link to="/" aria-label={"GO_HOME"}>
            <img alt="logo" aria-hidden src="/public/images/weblogo_127x31.svg" width={128} />
          </Link>
        </div>

        <div className={styles.menuItemsContainer}>
          {user ? (
            <div className={styles.leftSide}>
              <ul className={styles.ul}>
                {visibleItems.map((item) => (
                  <li key={item.title}>
                    {item.children ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          as="button"
                          className={clsx(styles.dropdownToggle, styles.hoverable)}
                        >
                          {item.title} <ChevronDown className={styles.icon} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className={styles.dropdownMenu}>
                          {item.children.map((child) =>
                            "to" in child ? (
                              <Dropdown.Item
                                key={child.title}
                                as={Link}
                                to={child.to}
                                onClick={child.onClick}
                              >
                                {child.title}
                              </Dropdown.Item>
                            ) : (
                              child
                            ),
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Link
                        to={item.to}
                        className={clsx(styles.itemLink, styles.hoverable)}
                        onClick={item.onClick}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {moreItems.length > 0 && (
                <div className={styles.moreWrapper}>
                  <Dropdown>
                    <Dropdown.Toggle
                      as="button"
                      className={clsx(styles.dropdownToggle, styles.hoverable)}
                    >
                      {"NAV_MORE"} <ChevronDown className={styles.icon} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.dropdownMenu}>
                      {moreItems.map((item) => {
                        return (
                          <Fragment key={item.title}>
                            <Dropdown.Item
                              key={item.title}
                              className="h4"
                              as={Link}
                              to={item.to}
                              onClick={item.onClick}
                            >
                              {item.title}
                            </Dropdown.Item>

                            {item.children?.map(
                              (child) =>
                                "to" in child && (
                                  <Dropdown.Item
                                    key={child.title}
                                    as={Link}
                                    to={child.to}
                                    onClick={child.onClick}
                                  >
                                    {child.title}
                                  </Dropdown.Item>
                                ),
                            )}
                          </Fragment>
                        )
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
          ) : (
            <div />
          )}

          <div className={styles.rightSide}>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  as="button"
                  className={clsx(styles.dropdownToggle, styles.hoverable)}
                >
                  <CircleQuestionMark />
                  <span style={{ marginLeft: 8 }}>{"NAV_GET_HELP"}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu}>
                  <div style={{ textAlign: "center" }}>Coming soon</div>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {user && (
              <div>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    className={clsx(styles.dropdownToggle, styles.hoverable)}
                  >
                    {user.fullName} <ChevronDown className={styles.icon} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={styles.dropdownMenu}>
                    <div>
                      <div>{user.sponsorName}</div>
                      <div className={styles.email}>{user.email}</div>
                    </div>

                    {user.items.map((item) => (
                      <Dropdown.Item key={item.title} as={Link} to={item.to} onClick={item.onClick}>
                        {item.title}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
