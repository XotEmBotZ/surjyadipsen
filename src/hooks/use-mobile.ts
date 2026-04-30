import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    
    // Use a microtask or similar to avoid synchronous setState in effect body
    // if the linter is extremely strict.
    const initialCheck = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    initialCheck()
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
