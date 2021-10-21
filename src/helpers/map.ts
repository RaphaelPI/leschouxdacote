export const getBounds = (list: [number, number][]): null | [number, number, number, number] => {
  if (!list.length) {
    return null
  }
  return [
    list.reduce((prev, [lng]) => (lng < prev ? lng : prev), list[0][0]),
    list.reduce((prev, [, lat]) => (lat > prev ? lat : prev), list[0][1]),
    list.reduce((prev, [lng]) => (lng > prev ? lng : prev), list[0][0]),
    list.reduce((prev, [, lat]) => (lat < prev ? lat : prev), list[0][1]),
  ]
}
