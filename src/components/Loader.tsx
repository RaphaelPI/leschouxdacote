import { COLORS } from "src/constants"
import styled, { keyframes } from "styled-components"

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  &:after {
    content: "";
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    border-radius: 50%;
    border-top: 4px solid ${COLORS.green};
    border-left: 4px solid ${COLORS.green};
    border-right: 4px solid transparent;
    animation: ${spin} 0.6s linear infinite;
  }
`

const Loader = () => {
  return <Spinner />
}

export default Loader
