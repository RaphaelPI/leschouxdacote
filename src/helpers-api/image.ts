import sharp from "sharp"
import { stat } from "fs"

import { storage } from "src/helpers-api/firebase"

const MIN_SIZE = 800 // ko
const WIDTH = 900 // pixels
const QUALITY = 75 // %

export const getSize = (path: string) =>
  new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        return reject(err)
      }
      resolve(stats.size)
    })
  })

export const resize = async (source: string) => {
  const destination = source + "-resized.jpg"
  const size = await getSize(source)
  if (size < MIN_SIZE * 1024) {
    throw new Error(`Photo trop petite : minimum ${MIN_SIZE} ko`)
  }

  await sharp(source)
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
