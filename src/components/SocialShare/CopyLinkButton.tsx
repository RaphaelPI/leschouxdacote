import CopyIcon from "@mui/icons-material/ContentCopy"
import CopiedIcon from "@mui/icons-material/Check"
import useClipboard from "react-use-clipboard"
import { Button } from "../Button"
import { Tooltip } from "@mui/material"

export const CopyLinkButton = ({ url }: { url: string }) => {
  const [isCopied, setCopied] = useClipboard(url)
  return (
    <Tooltip title={isCopied ? "Copié !" : "Copier le lien"}>
      <Button onClick={setCopied}>{isCopied ? <CopiedIcon /> : <CopyIcon />}</Button>
    </Tooltip>
  )
}
