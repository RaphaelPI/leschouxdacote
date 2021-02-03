import { FC, MouseEvent, useEffect } from "react"
import styled from "styled-components"

import { COLORS } from "src/constants"
import Portal from "src/components/Portal"

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  backdrop-filter: blur(2px);
`
const Box = styled.div`
  width: 600px;
  max-width: 80%;
  margin: 30vh auto 0;
  background-color: ${COLORS.white};
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 5px;
`
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 32px;
  font-weight: 300;
  border: none;
  background-color: transparent;
  padding: 2px 5px 6px;
  line-height: 20px;
`
const Content = styled.div`
  max-height: 50vh;
  overflow-y: auto;
  padding: 20px;
  text-align: center;
`

export interface Props {
  onClose: () => void
}

const Modal: FC<Props> = ({ onClose, children }) => {
  useEffect(() => {
    const onKeyPress = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", onKeyPress, false)
    return () => {
      document.removeEventListener("keydown", onKeyPress, false)
    }
  }, [onClose])

  const handleOverlayClick = ({ target, currentTarget }: MouseEvent<HTMLDivElement>) => {
    if (target === currentTarget) {
      onClose()
    }
  }

  return (
    <Portal>
      <Overlay onClick={handleOverlayClick}>
        <Box>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Content>{children}</Content>
        </Box>
      </Overlay>
    </Portal>
  )
}

export default Modal
