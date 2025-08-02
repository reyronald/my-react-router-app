const MAIN_LAYOUT_ID = "main-layout"
const FOOTER_ID = "footer"

export function SkipToContent() {
  return (
    <div role="navigation" className="container">
      <div id="skip-links">
        <a href={`#${MAIN_LAYOUT_ID}`} className="sl-link sl-link-sm visually-hidden-focusable">
          {"SKIP_TO_CONTENT"}
        </a>
        <a href={`#${FOOTER_ID}`} className="sl-link sl-link-sm visually-hidden-focusable">
          {"SKIP_TO_FOOTER"}
        </a>
      </div>
    </div>
  )
}
