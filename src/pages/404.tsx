import ErrorPage from "src/pages/_error"

const NotFoundPage = () => {
  return <ErrorPage statusCode={404} title="Page introuvable" />
}

export default NotFoundPage
