import { useFormContext } from "react-hook-form"

import { formatEnd } from "src/helpers/date"

interface Props {
  start?: number | null
}

const ProductEndDate = ({ start }: Props) => {
  const { watch } = useFormContext()
  const days = watch("days") as string

  return days ? <p>Fin de publication le {formatEnd(Number(days), start)}</p> : null
}

export default ProductEndDate
