import { lighten } from "polished"
import styled, { css } from "styled-components"

import { COLORS } from "src/constants"

interface InputProps {
  $size?: "regular" | "big"
}

const BASE_INPUT = css<InputProps>`
  color: ${COLORS.input};
  border-radius: 32px;
  border: none;
  padding: 16px 32px;
  font-size: 1.5em;
  border: 1px solid ${COLORS.border};
  outline: none;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);

  ::placeholder {
    font-weight: 100;
  }

  &:active,
  &:focus {
    position: relative;
    box-shadow: 0 0 0 0.25rem ${lighten(0.3, COLORS.grey)};
  }
`

export const Input = styled.input`
  ${BASE_INPUT}
`
