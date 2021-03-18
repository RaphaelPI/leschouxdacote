import { lighten } from "polished"
import styled from "@emotion/styled"

import { COLORS, LAYOUT } from "src/constants"

const SearchInput = styled.input`
  color: ${COLORS.input};
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

  width: 100%;
  @media (min-width: ${LAYOUT.mobile}px) {
    border-radius: 32px;
    width: 50%;
    &:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:not(:first-of-type) {
      margin-left: -1px;
    }
    &:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding-right: 8%;
    }
  }
`

export default SearchInput
