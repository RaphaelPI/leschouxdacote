import { SES } from "aws-sdk"
import { createTransport } from "nodemailer"

import { CONTACT_EMAIL } from "src/constants"

const transport = createTransport({
  SES: new SES({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_SES_REGION,
  }),
})

export const sendEmail = (to: string, subject: string, message: string) =>
  transport.sendMail({
    from: {
      name: "Les choux d'à côté",
      address: CONTACT_EMAIL,
    },
    to,
    subject,
    text: message,
  })
