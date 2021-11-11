import styled from "@emotion/styled"

import { isBrowser } from "src/helpers/window"
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
  transform: translate(1.8em);
`

interface Props {
  shareData: ShareData
  className?: string
}

export const SocialShareBar = ({ shareData, className }: Props) => {
  const hasShareApi = isBrowser() && "share" in navigator
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
