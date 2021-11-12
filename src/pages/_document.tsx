import Document, { Head, Html, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head />
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    )
  }
}
