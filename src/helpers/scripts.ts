const ID = "GMAPS"

type Callback = () => void

const callbacks: Callback[] = []

declare global {
  interface Window {
    initMap: () => void
  }
}

export const loadGmaps = () =>
  new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(ID)
    if (existing) {
      if (window.google) {
        resolve()
      } else {
        callbacks.push(resolve)
      }
      return
    }
    callbacks.push(resolve)
    window.initMap = () => {
      callbacks.forEach((cb) => cb())
    }
    const tag = document.createElement("script")
    tag.id = ID
    tag.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_FIREBASE_KEY}&libraries=places&callback=initMap`
    tag.onerror = reject
    document.head.appendChild(tag)
  })
