import FacebookIcon from "@mui/icons-material/Facebook"
import { useCallback } from "react"
import { queryString } from "src/helpers/url"
import { openPopup } from "src/helpers/window"
import { ShareButton } from "./ShareButton"

export interface FacebookShareButtonProps {
  shareData: ShareData
}

export const FacebookShareButton = ({ shareData }: FacebookShareButtonProps) => {
  const handleClick = useCallback(() => {
    const params = {
      u: shareData.url || "",
      quote: shareData.text || "",
    }
    openPopup("fb", `https://www.facebook.com/sharer/sharer.php?${queryString(params)}`)
  }, [shareData])

  return (
    <ShareButton title="Partager sur Facebook" onClick={handleClick}>
      <FacebookIcon />
    </ShareButton>
  )
}
