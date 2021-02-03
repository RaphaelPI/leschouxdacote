import { format, differenceInDays } from "date-fns"
import fr from "date-fns/locale/fr"

export const formatDate = (ts: number | null) => {
  if (!ts) {
    return ""
  }
  return format(ts, "do MMMM yyyy", { locale: fr }).replace("ème", "")
}

export const daysFromNow = (ts: number | null) => {
  if (!ts) {
    return ""
  }
  return `dans ${differenceInDays(ts, new Date()) + 1} jours`
}
