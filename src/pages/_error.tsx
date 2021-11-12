import { ErrorProps } from "next/error"
import Layout from "src/layout"

const ErrorPage = ({ statusCode, title }: ErrorProps) => {
  return (
    <Layout>
      <h1>Erreur {statusCode}</h1>
      <p>{title}</p>
    </Layout>
  )
}

export default ErrorPage
