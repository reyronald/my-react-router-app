import { clsx } from "clsx"
import { Dropdown } from "react-bootstrap"
import { Fragment } from "react/jsx-runtime"

import styles from "./TopPriorityNav.module.css"

import { ChevronDown, Mountain } from "lucide-react"
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
          <a href="/" aria-label={"GO_HOME"}>
            <Mountain size={32} />
          </a>
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
                                as="a"
                                href={child.to}
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
                      <a
                        href={item.to}
                        className={clsx(styles.itemLink, styles.hoverable)}
                        onClick={item.onClick}
                      >
                        {item.title}
                      </a>
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
                      More <ChevronDown className={styles.icon} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.dropdownMenu}>
                      {moreItems.map((item) => {
                        return (
                          <Fragment key={item.title}>
                            <Dropdown.Item
                              key={item.title}
                              className="h4"
                              as="a"
                              href={item.to}
                              onClick={item.onClick}
                            >
                              {item.title}
                            </Dropdown.Item>

                            {item.children?.map(
                              (child) =>
                                "to" in child && (
                                  <Dropdown.Item
                                    key={child.title}
                                    as="a"
                                    href={child.to}
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
                  <span style={{ marginLeft: 8 }}>Get Help</span>
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
                      <Dropdown.Item key={item.title} as="a" href={item.to} onClick={item.onClick}>
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
