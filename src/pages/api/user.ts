import type { NextApiRequest, NextApiResponse } from "next"

const checkCompany = async (siret: string) => {
  // TODO: use infogreffe API
  return !siret
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<RegisteringProducer>>) => {
  if (req.method === "POST") {
    // user registration
    const producer = req.body as RegisteringProducer
    const validCompany = await checkCompany(producer.siret)
    if (!validCompany) {
      return res.status(200).json({
        ok: false,
        errors: {
          siret: "Numéro de SIRET invalide",
        },
      })
    }
  }
  res.status(200).json({
    ok: true,
  })
}

export default handler
