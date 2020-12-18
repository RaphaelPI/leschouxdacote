export const formatAmount = (cents?: number) => {
  if (cents == null) {
    return ""
  }
  return (cents / 100).toFixed(2).replace(/(\d{1,3})\.(\d+)/g, "$1,$2 €")
}

export const formatPricePerUnit = (product: Product) => {
  if (!product.price) {
    return ""
  }
  const price = formatAmount(product.price)
  return product.unit ? `${price} / ${product.unit}` : price
}

export const getMapsLink = (producer: Producer) =>
  `https://www.google.com/maps/search/${encodeURIComponent(producer.address)}/`
