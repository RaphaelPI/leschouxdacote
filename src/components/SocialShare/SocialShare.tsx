import styled from "@emotion/styled"
import ShareIcon from "@mui/icons-material/Share"

import { isBrowser } from "src/helpers/window"
import { Button } from "../Button"
import { CopyLinkButton } from "./CopyLinkButton"
import { FacebookShareButton } from "./FacebookShareButton"
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

export const SocialShare = ({ shareData }: Props) => {
  const hasShareApi = isBrowser() && "share" in navigator
  return (
    <Root>
      {hasShareApi ? (
        <>
          <NavigatorShareButton shareData={shareData} />
        </>
      ) : (
        <>
          <WhatsAppShareButton shareData={shareData} />
          <FacebookShareButton shareData={shareData} />
        </>
      )}
      {shareData.url && <CopyLinkButton url={shareData.url} />}
    </Root>
  )
}

const NavigatorShareButton = ({ shareData }: { shareData: ShareData }) => {
  return (
    <Button onClick={() => navigator.share(shareData)}>
      <ShareIcon />
    </Button>
  )
}
