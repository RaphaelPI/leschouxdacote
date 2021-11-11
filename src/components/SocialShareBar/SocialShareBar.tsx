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

  & > button {
    margin: 0.5em;
  }
`

interface Props {
  shareData: ShareData
}

export const SocialShareBar = ({ shareData }: Props) => {
  const hasShareApi = isBrowser() && "share" in navigator
  return (
    <Root>
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
