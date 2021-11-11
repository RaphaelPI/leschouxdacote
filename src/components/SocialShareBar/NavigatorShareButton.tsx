import ShareIcon from "@mui/icons-material/Share"

import { ShareButton } from "./ShareButton"

export const NavigatorShareButton = ({ shareData }: { shareData: ShareData }) => {
  return (
    <ShareButton title="Partager" onClick={() => navigator.share(shareData)}>
      <ShareIcon />
    </ShareButton>
  )
}
