import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { useCallback } from "react"
import { queryString } from "src/helpers/url"
import { openPopup } from "src/helpers/window"
import { ShareButton } from "./ShareButton"

export interface WhatsAppShareButtonProps {
  shareData: ShareData
}

export const WhatsAppShareButton = ({ shareData }: WhatsAppShareButtonProps) => {
  const handleClick = useCallback(() => {
    const params = {
      text: [shareData.url, shareData.text].filter(Boolean).join("\n"),
    }
    openPopup("fb", `https://wa.me/?${queryString(params)}`)
  }, [shareData])

  return (
    <ShareButton title="Partager sur WhatsApp" onClick={handleClick}>
      <WhatsAppIcon />
    </ShareButton>
  )
}
