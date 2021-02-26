import { useEffect } from "react"
import router from "next/router"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

const Nprogress = () => {
  useEffect(() => {
    const handleStart = () => {
      nprogress.set(0.25)
      nprogress.start()
    }

    const handleEnd = () => {
      nprogress.done()
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleEnd)
    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleEnd)
    }
  }, [])

  return null
}

export default Nprogress
