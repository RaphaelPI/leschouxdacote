export const CONTACT_EMAIL = "contact@leschouxdacote.fr"

export const COLORS = {
  white: "#ffffff",
  dark: "#101010",
  menu: "#4A4A4A",
  divider: "#666666",
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
  lightDark: "#272D3B",
  blue: "#0077CF",
  background: {
    success: "rgb(71, 210, 91, 10%)",
    info: "rgb(0, 119, 207, 10%)",
  },
}

// eslint-disable-next-line no-shadow
export enum USER_ROLE {
  PRODUCER = "PRODUCER",
  BUYER = "BUYER",
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
  maxWidth: 1100,
  formWidth: 500,
  mapPopupWidth: 250,
  mobile: 900,
  tablet: 1200,
}

export const FONT = "'Roboto', sans-serif"

export const SEARCH_RADIUS = {
  // meters, see https://www.algolia.com/doc/api-reference/api-parameters/aroundRadius/
  city: 50_000,
  dpt: 120_000,
  region: 300_000,
}

// TODO: https://vercel.com/docs/concepts/next.js/incremental-static-regeneration
export const SSR_CACHE_HEADER = "max-age=3600, s-maxage=60, stale-while-revalidate=86400"
