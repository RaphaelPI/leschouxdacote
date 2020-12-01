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

export const InputGroup = styled.div`
  display: inline-block;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 32px;

  & > input:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  & > input:not(first-child) {
    margin-left: -1px;
  }
  & > input:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`
