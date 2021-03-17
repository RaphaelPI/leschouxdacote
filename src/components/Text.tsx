import styled from "@emotion/styled"

import { SIZES } from "src/constants"

interface TextProps {
  $size?: number
  $color?: string
  $weight?: number
}

export const Text = styled.p<TextProps>`
  margin: 0;
  padding: 0;
  font-size: ${({ $size }) => $size || SIZES.regular}px;
  ${({ $color }) => ($color ? `color: ${$color};` : ``)};
  ${({ $weight }) => ($weight ? `font-weight: ${$weight};` : ``)};
`
