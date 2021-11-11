import FacebookIcon from "@mui/icons-material/Facebook"

import { Button } from "../Button"

export interface FacebookShareConfig {}

export const FacebookShareButton = ({ config }: { config: FacebookShareConfig }) => {
  return (
    <Button title="Partager sur Facebook">
      <FacebookIcon />
    </Button>
  )
}
