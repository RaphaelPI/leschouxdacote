import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

import { COLORS } from "src/constants"

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border-top: 3px solid ${COLORS.green};
  border-left: 3px solid ${COLORS.green};
  border-right: 3px solid transparent;
  animation: ${spin} 0.6s linear infinite;
`

export default Loader

export const Loading = styled(Loader)`
  display: block;
  margin: 35vh auto 0;
`
