import Layout from "src/layout"

import { ErrorProps } from "next/error"

const ErrorPage = ({ statusCode, title }: ErrorProps) => {
  return (
    <Layout>
      <h1>Erreur {statusCode}</h1>
      <p>{title}</p>
    </Layout>
  )
}

export default ErrorPage
