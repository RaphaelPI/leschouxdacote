interface FormattedUnit {
  singular: string
  plural: string
}

const UNITS: Partial<Record<Product["unit"], FormattedUnit>> = {
  u: {
    singular: "pièce",
    plural: "pièces",
  },
  l: {
    singular: "litre",
    plural: "litres",
  },
}

const getUnit = (unit: Product["unit"], quantity = 1) => {
  const fUnit = UNITS[unit]
  if (fUnit) {
    return quantity > 1 ? fUnit.plural : fUnit.singular
  }
  return unit
}

export const formatAmount = (cents?: number) => {
  if (cents == null) {
    return ""
  }
  return (cents / 100).toFixed(2).replace(/(\d{1,3})\.(\d+)/g, "$1,$2 €")
}

export const formatPricePerUnit = ({ price, quantity, unit }: Pick<Product, "price" | "quantity" | "unit">) => {
  if (price == null || !quantity) {
    return ""
  }
  return `${formatAmount(price / quantity)} / ${getUnit(unit || "u")}`
}

export const formatQuantity = ({ unit, quantity }: Product) => {
  if (!quantity) {
    return ""
  }
  return `${String(quantity).replace(".", ",")} ${getUnit(unit || "u", quantity)}`
}

export const formatPrice = ({ price }: Product) => formatAmount(price)

export const getMapsLink = ({ address }: Producer | Product) =>
  `https://www.google.com/maps/search/${encodeURIComponent(address)}`

export const getAbsoluteUrl = (path: string) => `${location.protocol}//${location.host}/${path}`
