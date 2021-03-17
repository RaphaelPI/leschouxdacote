import { lighten } from "polished"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

import { COLORS } from "src/constants"

const BASE_INPUT = css`
  color: ${COLORS.input};
  border-radius: 32px;
  padding: 6px 16px;
  border: 1px solid ${COLORS.border};
  outline: none;
  font-size: 1em;

  &::placeholder {
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
