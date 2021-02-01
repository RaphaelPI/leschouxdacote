import sharp from "sharp"
import { stat } from "fs"

import { storage } from "src/helpers-api/firebase"

const MIN_SIZE = 200 // ko
const WIDTH = 900 // pixels
const QUALITY = 75 // %

export const getSize = (path: string): Promise<number> =>
  new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        return reject(err)
      }
      resolve(stats.size)
    })
  })

export const resize = async (source: string) => {
  const size = await getSize(source)
  if (size < MIN_SIZE * 1024) {
    // TODO: check and show on front end
    throw new Error(`Photo trop petite : minimum ${MIN_SIZE} ko`)
  }

  const image = sharp(source)

  const { width } = await image.metadata()

  if (!width) {
    throw new Error(`Photo invalide (format incorrect)`)
  }

  if (width < WIDTH) {
    // TODO: check and show on front end
    throw new Error(`Photo trop petite : minimum ${WIDTH} pixels de large`)
  }

  const destination = source + "-resized.jpg"

  await image
    .resize({ width: WIDTH, withoutEnlargement: true })
    .toFormat("jpeg", { quality: QUALITY })
    .toFile(destination)

  return destination
}

export const upload = async (path: string, name: string) => {
  const [, metadata] = await storage.bucket().upload(path, {
    public: true,
    destination: name + ".jpg",
  })

  return metadata.mediaLink as string
}
