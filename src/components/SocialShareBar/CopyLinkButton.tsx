import CopiedIcon from "@mui/icons-material/Check"
import CopyIcon from "@mui/icons-material/ContentCopy"
import useClipboard from "react-use-clipboard"
import { ShareButton } from "./ShareButton"

export const CopyLinkButton = ({ url }: { url: string }) => {
  const [isCopied, setCopied] = useClipboard(url)
  return (
    <ShareButton title={isCopied ? "Copié !" : "Copier le lien"} onClick={setCopied}>
      {isCopied ? <CopiedIcon /> : <CopyIcon />}
    </ShareButton>
  )
}
