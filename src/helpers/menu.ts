import { useState, useRef, useEffect } from "react"

export const useMenu = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickAway = ({ target }: MouseEvent | TouchEvent) => {
      if (ref.current && target && !ref.current.contains(target as Node)) {
        setOpen(false)
      }
    }

    // https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ClickAwayListener/ClickAwayListener.js
    document.addEventListener("touchstart", handleClickAway)
    document.addEventListener("click", handleClickAway)
    return () => {
      document.removeEventListener("touchstart", handleClickAway)
      document.removeEventListener("click", handleClickAway)
    }
  }, [])

  return { open, setOpen, ref }
}
