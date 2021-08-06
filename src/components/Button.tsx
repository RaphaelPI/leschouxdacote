import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { darken, lighten } from "polished"

import { COLORS, SIZES } from "src/constants"

type ButtonVariant = "green" | "white" | "red"

export interface ButtonProps {
  $variant?: ButtonVariant
}

// [background-color, color, border-color, focus]
const BUTTON_VARIANT: Record<ButtonVariant, string[]> = {
  green: [COLORS.green, COLORS.white, COLORS.green, COLORS.green],
  white: [COLORS.white, COLORS.input, COLORS.border, COLORS.grey],
  red: [COLORS.red, COLORS.white, COLORS.red, COLORS.red],
}

const getButtonCss = ($variant: ButtonVariant) => css`
  background-color: ${BUTTON_VARIANT[$variant][0]};
  color: ${BUTTON_VARIANT[$variant][1]};
  padding: 8px 16px;
  transition: background-color 150ms;
  border: 1px solid ${BUTTON_VARIANT[$variant][2]};
  border-radius: 8px;
  position: relative;
  font-size: ${SIZES.regular}px;
  font-weight: 400;

  &:hover {
    background-color: ${darken(0.1, BUTTON_VARIANT[$variant][0])};
  }

  &:active,
  &:focus {
    box-shadow: 0 0 0 0.25rem ${lighten(0.3, BUTTON_VARIANT[$variant][3])};
    z-index: 1;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${COLORS.grey};
    border-color: ${COLORS.grey};
  }
`

export const Button = styled.button<ButtonProps>`
  ${({ $variant }) => getButtonCss($variant || "white")}
`
export const LinkButton = styled.a<ButtonProps>`
  ${({ $variant }) => getButtonCss($variant || "white")}
  display: inline-block;
`

export const ButtonGroup = styled.div`
  > *:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  > *:not(:first-of-type) {
    margin-left: -1px;
  }
  > *:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const IconButtonStyle = styled.button`
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding: 10px 30px;
`

interface IconButtonProps {
  iconUrl: string
}

export const IconButton: React.FC<IconButtonProps> = ({ iconUrl, children }) => {
  return (
    <IconButtonStyle>
      <img src={iconUrl} alt="button icon description" />
      <span>{children}</span>
    </IconButtonStyle>
  )
}
