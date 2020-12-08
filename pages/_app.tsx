import { ErrorInfo } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Head from "next/head"
import { AppProps } from "next/app"

import { ErrorBoundary } from "src/helpers/bugsnag"

const FONT = "'Roboto', sans-serif"

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-family: ${FONT};
  }

  h1 {
    font-size: 1.7em;
    font-weight: 500;
    margin: 0 0 20px;
  }
`

const ErrorContainer = styled.div`
  font-family: ${FONT};
  padding: 2em 1em;
  h1 {
    color: #e10f14;
  }
  code {
    display: block;
    margin-top: 8em;
    color: #aaa;
  }
`

// https://github.com/bugsnag/bugsnag-js/blob/next/packages/plugin-react/types/bugsnag-plugin-react.d.ts
interface FallbackProps {
  error: Error
  info: ErrorInfo
  clearError: () => void
}

const ErrorComponent = ({ error }: FallbackProps) => (
  <ErrorContainer>
    <h1>
      <span aria-hidden>🐞</span>
      <br />
      An error happened
    </h1>
    <h2>Try reloading the page</h2>
    <code>{String(error)}</code>
  </ErrorContainer>
)

export default function MyApp({ Component, pageProps }: AppProps) {
  const children = (
    <>
      <GlobalStyle />
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )

  return ErrorBoundary ? <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary> : children
}
