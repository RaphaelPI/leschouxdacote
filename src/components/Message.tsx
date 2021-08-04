import React, { MutableRefObject, useRef } from "react"
import styled from "@emotion/styled"

import { COLORS, LAYOUT, SIZES } from "src/constants"
import CheckCircle from "src/assets/icon-feather-check-circle.svg"
import CloseCirce from "src/assets/icon-lose-circle-outline.svg"
import InfoIcon from "src/assets/icon-feather-info.svg"

type MessageType = "success" | "error"

const Box = styled.div<{ $type: MessageType }>`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 70%;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: ${({ $type }) => ($type === "success" ? "rgb(71, 210, 91, 10%)" : "rgb(0, 119, 207, 10%)")};
  position: relative;

  @media (max-width: ${LAYOUT.mobile}px) {
    width: 100%;
    padding: 10px;
  }
`

const Title = styled.span`
  color: ${COLORS.green};
  font-weight: bold;
  font-size: ${SIZES.large}px;

  @media (max-width: ${LAYOUT.mobile}px) {
    font-size: ${SIZES.regular}px;
  }
`

const Content = styled.span`
  display: block;
  margin-top: 10px;
  font-size: ${SIZES.large}px;

  @media (max-width: ${LAYOUT.mobile}px) {
    font-size: ${SIZES.regular}px;
  }
`

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

interface SuccessProps {
  title?: string
  type: MessageType
}

const Message: React.FC<SuccessProps> = ({ title, type, children }) => {
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>

  const handleClick = () => {
    if (ref && ref.current) {
      ref.current.style.display = "none"
    }
  }

  return (
    <Box ref={ref} $type={type}>
      <CloseIconWrapper onClick={handleClick}>
        <CloseCirce />
      </CloseIconWrapper>
      {type === "success" && <CheckCircle style={{ flex: "0 0 20%" }} />}
      {type === "error" && <InfoIcon style={{ flex: "0 0 20%" }} />}
      <div>
        {type === "success" && <Title>{title}</Title>}
        <Content>{children}</Content>
      </div>
    </Box>
  )
}

export default Message
