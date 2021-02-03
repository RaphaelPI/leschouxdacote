import { format, differenceInDays, addDays } from "date-fns"
import fr from "date-fns/locale/fr"

export const formatDate = (ts: number | Date | null) => {
  if (!ts) {
    return ""
  }
  return format(ts, "do MMMM yyyy", { locale: fr }).replace("ème", "")
}

export const daysFromNow = (ts: number | Date | null) => {
  if (!ts) {
    return ""
  }
  return `dans ${differenceInDays(ts, new Date()) + 1} jours`
}

export const formatEnd = (days: number, start?: number | Date | null) => {
  const end = addDays(start || new Date(), days)
  return formatDate(end)
}
