interface FormattedUnit {
  singular: string
  plural: string
}

const UNITS: Record<string, FormattedUnit> = {
  u: {
    singular: "unité",
    plural: "unités",
  },
}

const getUnit = (unit = "u", quantity = 1) => {
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

export const formatPricePerUnit = ({ price, unit }: Product) => {
  if (price == null) {
    return ""
  }
  return `${formatAmount(price)} / ${getUnit(unit)}`
}

export const formatQuantity = ({ unit, quantity }: Product) => `${quantity} ${getUnit(unit, quantity)}`

export const formatPrice = ({ price, quantity }: Product) => formatAmount(price * quantity)

export const getMapsLink = (producer: Producer) =>
  `https://www.google.com/maps/search/${encodeURIComponent(producer.address)}/`

export const getAbsoluteUrl = (path: string) => `${location.protocol}//${location.host}/${path}`
