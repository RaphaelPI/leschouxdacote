import router from "next/router"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

nprogress.configure({ showSpinner: false })

router.events.on("routeChangeStart", () => {
  nprogress.start()
})
router.events.on("routeChangeComplete", () => {
  nprogress.done()
})
router.events.on("routeChangeError", () => {
  nprogress.done()
})
