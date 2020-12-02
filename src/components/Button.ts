import styled, { css } from "styled-components"
import { darken, lighten } from "polished"

import { COLORS } from "src/constants"

// [background-color, color, border-color, focus]
const BUTTON_VARIANT: Record<string, string[]> = {
  green: [COLORS.green, COLORS.white, COLORS.green, COLORS.green],
  white: [COLORS.white, COLORS.input, COLORS.border, COLORS.grey],
}

interface ButtonProps {
  $variant: "green" | "white"
}

const BASE_BUTTON = css<ButtonProps>`
  background-color: ${({ $variant }) => BUTTON_VARIANT[$variant][0]};
  color: ${({ $variant }) => BUTTON_VARIANT[$variant][1]};
  border-radius: 8px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.1s;
  border: 1px solid ${({ $variant }) => BUTTON_VARIANT[$variant][2]};
  outline: none;

  &:hover {
    background-color: ${({ $variant }) => darken(0.1, BUTTON_VARIANT[$variant][0])};
  }

  &:active,
  &:focus {
    box-shadow: 0 0 0 0.25rem ${({ $variant }) => lighten(0.3, BUTTON_VARIANT[$variant][3])};
  }
`

export const Button = styled.button`
  ${BASE_BUTTON}
`

export const ButtonGroup = styled.div`
  & > button:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  & > button:not(first-child) {
    margin-left: -1px;
  }
  & > button:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  & > button:active,
  & > button:focus {
    position: relative;
  }
`
