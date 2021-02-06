import styled, { keyframes } from "styled-components"

import { COLORS } from "src/constants"

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-top: 3px solid ${COLORS.green};
  border-left: 3px solid ${COLORS.green};
  border-right: 3px solid transparent;
  animation: ${spin} 0.6s linear infinite;
`

export default Loader
