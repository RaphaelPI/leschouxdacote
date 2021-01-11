import type { NextApiResponse } from "next"

export const respond = (res: NextApiResponse, errors?: Record<string, string>, code = 200) => {
  res.status(code).json(errors ? { errors } : { ok: true })
}
