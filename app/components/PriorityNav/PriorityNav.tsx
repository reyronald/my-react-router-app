import { debounce } from "es-toolkit"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

import { Dropdown } from "react-bootstrap"

import { cn } from "~/utils/cn"

import "./PriorityNav.css"

type Props = {
  items: Array<{
    title: string
    children: string[]
  }>
}

const hover = cn(
  "border-b-2 border-transparent",
  "hover:border-b-2 hover:border-gray-800 cursor-pointer transition",
)

export function PriorityNav({ items }: Props) {
  const [hiddenItems, setHiddenItems] = useState<string[] | null>(null)

  const itemsWrapperRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<HTMLLIElement[]>([])
  const moreButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const itemWidths = itemsRef.current.map((el) => {
      const style = window.getComputedStyle(el)
      const margins = parseFloat(style.marginLeft) + parseFloat(style.marginRight)
      const itemWidth = el.offsetWidth + margins
      return itemWidth
    })

    const onResize = debounce(() => {
      setHiddenItems((previouslyHiddenItems) => {
        if (itemsWrapperRef.current === null) return previouslyHiddenItems
        if (moreButtonRef.current === null) return previouslyHiddenItems

        const navContainerWidth = itemsWrapperRef.current.clientWidth
        const nextHiddenItems = previouslyHiddenItems?.slice() ?? []
        const moreWidth = moreButtonRef.current.offsetWidth
        const buffer = 25

        let itemsWidthSum = 0

        for (let index = 0; index < itemWidths.length; index++) {
          const item = items[index] ?? ""
          itemsWidthSum += itemWidths[index] ?? 0

          if (itemsWidthSum > navContainerWidth - moreWidth - buffer) {
            if (!previouslyHiddenItems || !previouslyHiddenItems.includes(item.title)) {
              nextHiddenItems.push(item.title)
            }
          } else {
            const i = nextHiddenItems.indexOf(item.title)
            if (i !== -1) {
              nextHiddenItems.splice(i, 1)
            }
          }
        }

        return nextHiddenItems
      })
    }, 50)

    onResize()

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [items])

  return (
    <nav
      className={cn(
        "border-b border-gray-300 text-gray-700 font-sans!",
        hiddenItems == null ? "invisible" : "visible",
      )}
    >
      <div className="flex items-center h-20 max-w-[1152px] mx-auto">
        <div className="min-w-[128px] w-[128px] mr-18">
          <img alt="logo" src="weblogo_127x31.svg" width={300}></img>
        </div>

        <div className="flex flex-grow justify-between h-20">
          <div className="flex flex-grow items-center relative text-lg" ref={itemsWrapperRef}>
            <ul className="flex h-20 m-0 p-0 space-x-4 max-w-[660px]">
              {items
                .filter((item) => !hiddenItems?.includes(item.title))
                .map((item, index) => (
                  <li
                    key={item.title}
                    ref={(el) => {
                      el && (itemsRef.current[index] = el)
                    }}
                    className="min-w-fit"
                  >
                    {item.children.length > 0 ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          as="button"
                          className={cn(
                            "DropdownButton",
                            "after:!content-none",
                            "flex items-center",
                            "h-20 py-4 px-2",
                            hover,
                          )}
                        >
                          {item.title} <Chevron direction="down" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="px-2 py-2">
                          {item.children.map((child) => (
                            <Dropdown.Item key={child} as={Link} to="/">
                              {child}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Link
                        to="/"
                        className={cn(
                          "text-black",
                          "no-underline!",
                          "flex items-center",
                          "h-20 py-4",
                          hover,
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
            </ul>

            <div className="ml-4">
              <Dropdown>
                <Dropdown.Toggle
                  ref={moreButtonRef}
                  id="dropdown-basic"
                  as="button"
                  className={cn(
                    "DropdownButton",
                    "h-20 py-4 px-2 flex items-center ",
                    "after:!content-none",
                    hover,
                    hiddenItems && hiddenItems.length > 0 ? "visible" : "invisible absolute",
                  )}
                >
                  More <Chevron direction="down" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="px-2 py-2 space-y-5">
                  {items
                    .filter((item) => hiddenItems?.includes(item.title))
                    .map((item) => {
                      const title =
                        item.children.length === 0 ? (
                          <Dropdown.Item key={item.title} className="text-xl" as={Link} to="/">
                            {item.title}
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            key={item.title}
                            className="text-xl cursor-default hover:bg-white!"
                            as="div"
                          >
                            {item.title}
                          </Dropdown.Item>
                        )

                      return (
                        <div key={item.title} className="space-y-3">
                          {title}

                          {item.children.map((child) => (
                            <Dropdown.Item key={child} as={Link} to="/" className="text-sm">
                              {child}
                            </Dropdown.Item>
                          ))}
                        </div>
                      )
                    })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className={cn("h-20 min-w-fit", "flex items-center", hover)}>
              <InfoCircle /> Get help
            </div>

            <div className={cn("h-20 min-w-fit", "flex items-center", hover)}>Ronald Rey</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Chevron({ direction }: { direction?: "up" | "down" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 20 20"
      className={cn(
        "inline-block text-gray-400",
        "transition-transform duration-400",
        direction === "up" ? "rotate-180" : "rotate-0",
      )}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 8l4 4 4-4"
      />
    </svg>
  )
}

function InfoCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 20 20"
      className="inline-block mr-2 text-gray-400"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="9" width="2" height="6" rx="1" fill="currentColor" />
      <circle cx="10" cy="6" r="1" fill="currentColor" />
    </svg>
  )
}
