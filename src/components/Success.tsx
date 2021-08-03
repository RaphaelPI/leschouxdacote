import React, { MutableRefObject, useRef } from "react"
import styled from "@emotion/styled"
import { COLORS, LAYOUT, SIZES } from "src/constants"
import CheckCircle from "src/assets/icon-feather-check-circle.svg"
import CloseCirce from "src/assets/icon-lose-circle-outline.svg"

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 70%;
  padding: 30px;
  border-radius: 10px;
  background-color: rgb(71, 210, 91, 10%);
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
  title: string
}

const Success: React.FC<SuccessProps> = ({ title, children }) => {
  const ref = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>

  const handleClick = () => {
    if (ref && ref.current) {
      ref.current.style.display = "none"
    }
  }

  return (
    <Box ref={ref}>
      <CloseIconWrapper onClick={handleClick}>
        <CloseCirce />
      </CloseIconWrapper>
      <CheckCircle style={{ flex: "0 0 20%" }} />
      <div>
        <Title>{title}</Title>
        <Content>{children}</Content>
      </div>
    </Box>
  )
}

export default Success
