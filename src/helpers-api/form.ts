import { File, IncomingForm } from "formidable"
import type { NextApiRequest } from "next"

type SingleFiles = Record<string, File>

export const getFormData = <T = any>(req: NextApiRequest): Promise<[T, SingleFiles]> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      resolve([fields as unknown as T, files as SingleFiles])
    })
  })
