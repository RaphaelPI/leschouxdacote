export const formatAmount = (cents: number | undefined) => {
  if (cents == null || typeof cents === undefined) {
    return ""
  }
  return (cents / 100).toFixed(2).replace(/(\d{1,3})\.(\d+)/g, " $1.$2 €")
}

export const getIntegerAmount = (cents: number) => formatAmount(cents).split(".")[0]
export const getDecimalAmount = (cents: number) => formatAmount(cents).split(".")[1]

export const getMapsLink = (producer: Producer) =>
  `https://www.google.com/maps/search/${encodeURIComponent(producer.address)}/`
