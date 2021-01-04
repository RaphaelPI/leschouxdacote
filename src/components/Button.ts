import styled, { css } from "styled-components"
import { darken, lighten } from "polished"

import { COLORS, SIZES } from "src/constants"

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
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 150ms;
  border: 1px solid ${({ $variant }) => BUTTON_VARIANT[$variant][2]};
  border-radius: 8px;
  outline: none;
  position: relative;
  font-size: ${SIZES.regular}px;
  font-weight: 400;

  &:hover {
    background-color: ${({ $variant }) => darken(0.1, BUTTON_VARIANT[$variant][0])};
  }

  &:active,
  &:focus {
    box-shadow: 0 0 0 0.25rem ${({ $variant }) => lighten(0.3, BUTTON_VARIANT[$variant][3])};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${COLORS.grey};
    border-color: ${COLORS.grey};
  }
`

export const Button = styled.button`
  ${BASE_BUTTON}
`
export const LinkButton = styled.a`
  ${BASE_BUTTON}
  display: inline-block;
`

export const ButtonGroup = styled.div`
  > *:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  > *:not(:first-child) {
    margin-left: -1px;
  }
  > *:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`
