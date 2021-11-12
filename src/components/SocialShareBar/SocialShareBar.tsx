import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { isWindows } from "src/helpers/window"
import { CopyLinkButton } from "./CopyLinkButton"
import { FacebookShareButton } from "./FacebookShareButton"
import { NavigatorShareButton } from "./NavigatorShareButton"
import { WhatsAppShareButton } from "./WhatsAppShareButton"

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  padding: 0.5em;
  font-size: 0.5em;
`

interface Props {
  shareData: ShareData
  className?: string
}

export const SocialShareBar = ({ shareData, className }: Props) => {
  const [hasShareApi, setHasShareApi] = useState(false)

  useEffect(() => {
    // We need to figure that out client-side, and not during NextJS rendering.
    setHasShareApi("share" in navigator && !isWindows())
  }, [])

  return (
    <Root className={className}>
      {hasShareApi ? (
        <NavigatorShareButton shareData={shareData} />
      ) : (
        <>
          <WhatsAppShareButton shareData={shareData} />
          <FacebookShareButton shareData={shareData} />
          {shareData.url && <CopyLinkButton url={shareData.url} />}
        </>
      )}
    </Root>
  )
}
