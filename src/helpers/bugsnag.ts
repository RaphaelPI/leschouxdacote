import React from "react"
import Bugsnag from "@bugsnag/js"
import BugsnagReact from "@bugsnag/plugin-react"

const apiKey = process.env.NEXT_PUBLIC_BUGSNAG

if (apiKey) {
  Bugsnag.start({
    apiKey,
    releaseStage: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
    enabledReleaseStages: ["production", "preview"],
    appVersion: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local",
    metadata: {
      deployUrl: process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "local",
      deployDate: new Date().toString(),
      deployAuthor: `${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME} (${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN})`,
    },
    plugins: [new BugsnagReact(React)],
  })
}

export const ErrorBoundary = apiKey ? Bugsnag.getPlugin("react")?.createErrorBoundary() : null
