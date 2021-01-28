import type { NextApiRequest } from "next"
import { IncomingForm, File } from "formidable"

type SingleFiles = Record<string, File>

export const getFormData = (req: NextApiRequest): Promise<[any, SingleFiles]> =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm()
    form.parse(req, (err, fields, files: SingleFiles) => {
      if (err) {
        return reject(err)
      }
      resolve([fields, files])
    })
  })
