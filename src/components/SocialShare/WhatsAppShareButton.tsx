import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { useCallback } from "react"
import { Tooltip } from "@mui/material"

import { Button } from "../Button"
import { queryString } from "src/helpers/url"
import { openPopup } from "src/helpers/window"

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
    <Tooltip title="Partager sur WhatsApp">
      <Button onClick={handleClick}>
        <WhatsAppIcon />
      </Button>
    </Tooltip>
  )
}
