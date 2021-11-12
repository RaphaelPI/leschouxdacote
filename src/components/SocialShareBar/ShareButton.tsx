import styled from "@emotion/styled"
import { Tooltip } from "@mui/material"
import { ReactElement } from "react"
import { Button } from "src/components/Button"

interface ShareButtonProps {
  title: string
  onClick: () => void
  children: ReactElement
}

const StyledButton = styled(Button)`
  border: none;
  background: none;
  padding: 0.5em;
`

export const ShareButton = ({ title, onClick, children }: ShareButtonProps) => {
  return (
    <Tooltip title={title}>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </Tooltip>
  )
}
