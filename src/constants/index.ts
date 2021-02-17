import type { LatLngExpression } from "leaflet"

export const CONTACT_EMAIL = "contact@leschouxdacote.fr"

export const COLORS = {
  white: "#ffffff",
  dark: "#101010",
  grey: "#a6a6a6",
  input: "#686666",
  border: "#D6D6D6",
  odd: "#F9F9F9",
  green: "#47D25B",
  red: "#DF3D3D",
  shadow: {
    light: "#0000001A",
    regular: "#0000004A",
  },
}

export const SIZES = {
  price: 35,
  subtitle: 22,
  large: 19,
  card: 16,
  regular: 14,
  small: 12,
  tiny: 10,
}

export const LAYOUT = {
  headerHeight: 80,
  maxWidth: 1100,
  formWidth: 500,
  mapPopupWidth: 250,
}

export const FONT = "'Roboto', sans-serif"

export const TOULOUSE: LatLngExpression = [43.62, 1.42]
export const SEARCH_RADIUS = 15_000 // meters, see https://www.algolia.com/doc/api-reference/api-parameters/aroundRadius/
