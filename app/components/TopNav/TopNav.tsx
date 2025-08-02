import { debounce } from "es-toolkit"
import { useEffect, useRef, useState } from "react"
import { cn } from "~/utils/cn"

const TopNav = ({ items }: { items: string[] }) => {
  const [hiddenItems, setHiddenItems] = useState<string[]>([])

  const navRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<HTMLLIElement[]>([])
  const moreButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const itemWidths = itemsRef.current.map((el) => el.offsetWidth)

    const onResize = debounce(() => {
      setHiddenItems((previouslyHiddenItems) => {
        if (navRef.current === null) return previouslyHiddenItems
        if (moreButtonRef.current === null) return previouslyHiddenItems

        const navContainerWidth = navRef.current.clientWidth
        const nextHiddenItems = previouslyHiddenItems.slice()
        const moreWidth = moreButtonRef.current.offsetWidth
        const buffer = 25

        let itemsWidthSum = 0

        for (let index = 0; index < itemWidths.length; index++) {
          const item = items[index] ?? ""
          itemsWidthSum += itemWidths[index] ?? 0

          if (itemsWidthSum > navContainerWidth - moreWidth - buffer) {
            if (!previouslyHiddenItems.includes(item)) {
              nextHiddenItems.push(item)
            }
          } else {
            const i = nextHiddenItems.indexOf(item)
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
    <div className="space-y-4">
      <nav className="flex items-center overflow-hidden" style={{ outline: "1px solid white" }}>
        <div className="px-4 py-2">Logo</div>

        <div className="flex flex-grow justify-between overflow-hidden">
          <div
            className="flex flex-grow items-center overflow-hidden relative"
            ref={navRef}
            style={{ outline: "1px solid red" }}
          >
            <ul className="flex overflow-hidden">
              {items
                .filter((item) => !hiddenItems.includes(item))
                .map((item, index) => (
                  <li
                    key={item}
                    ref={(el) => el && (itemsRef.current[index] = el)}
                    className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
            </ul>

            <button
              ref={moreButtonRef}
              className={cn(
                "px-4 py-2 hover:bg-gray-800 cursor-pointer min-w-[90px]",
                hiddenItems.length > 0 ? "visible" : "absolute invisible",
              )}
              type="button"
            >
              More ▼
            </button>
          </div>

          <div className="px-4 py-2">User</div>
        </div>
      </nav>

      <div>
        {hiddenItems.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default TopNav
