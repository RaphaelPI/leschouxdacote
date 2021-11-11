import CopyIcon from "@mui/icons-material/ContentCopy"
import CopiedIcon from "@mui/icons-material/Check"
import useClipboard from "react-use-clipboard"
import { Button } from "../Button"

export const CopyLinkButton = ({ url }: { url: string }) => {
  const [isCopied, setCopied] = useClipboard(url)
  return (
    <Button title="Copier le lien" onClick={setCopied}>
      {isCopied ? <CopiedIcon /> : <CopyIcon />}
    </Button>
  )
}
