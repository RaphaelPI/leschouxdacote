import { ErrorInfo } from "react"
import styled from "@emotion/styled"
import { css, Global } from "@emotion/react"
import { AppProps } from "next/app"
import { GoogleFonts } from "next-google-fonts"

import "src/components/Nprogress"
import { ErrorBoundary } from "src/helpers/bugsnag"
import { FONT, LAYOUT } from "src/constants"
import { UserProvider } from "src/helpers/auth"

const globalStyle = css`
  :root {
    --header-height: 80px;
    @media (max-width: ${LAYOUT.mobile}px) {
      --header-height: 60px;
    }
  }

  html {
    scroll-padding-top: calc(var(--header-height) + 30px);
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-weight: 300;
  }

  * {
    font-family: ${FONT};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  h1 {
    font-size: 1.7em;
    font-weight: 500;
    margin: 0 0 24px;
  }
  h2 {
    font-size: 1.2em;
    font-weight: 400;
  }

  button {
    cursor: pointer;
    font-size: inherit;
    outline: none;
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

const MyApp = ({ Component, pageProps }: AppProps) => {
  const children = (
    <>
      <Global styles={globalStyle} />
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  )

  return ErrorBoundary ? <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary> : children
}

export default MyApp
