import styled from "@emotion/styled"

import { CopyLinkButton } from "./CopyLinkButton"
import { FacebookShareConfig, FacebookShareButton } from "./FacebookShareButton"

const Root = styled.div``

interface Props {
  copyLink?: string
  facebookShare?: FacebookShareConfig
}

export const SocialShare = ({ copyLink, facebookShare }: Props) => {
  return (
    <Root>
      {facebookShare && <FacebookShareButton config={facebookShare} />}
      {copyLink && <CopyLinkButton url={copyLink} />}
    </Root>
  )
}
