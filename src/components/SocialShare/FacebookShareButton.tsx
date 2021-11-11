import FacebookIcon from "@mui/icons-material/Facebook"
import { useCallback } from "react"
import { Tooltip } from "@mui/material"

import { Button } from "../Button"
import { queryString } from "src/helpers/url"
import { openPopup } from "src/helpers/window"

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
    <Tooltip title="Partager sur Facebook">
      <Button onClick={handleClick}>
        <FacebookIcon />
      </Button>
    </Tooltip>
  )
}
