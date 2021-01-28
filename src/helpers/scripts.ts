export const loadScript = (id: string, src: string) => {
  const existing = document.getElementById(id)
  if (existing) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script")
    tag.id = id
    tag.src = src
    tag.onload = resolve
    tag.onerror = reject
    document.head.appendChild(tag)
  })
}
