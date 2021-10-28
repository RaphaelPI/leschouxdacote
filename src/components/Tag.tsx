import styled from "@emotion/styled"

import { COLORS } from "src/constants"

const Tag = styled.strong`
  display: inline-block;
  font-weight: normal;
  background-color: ${COLORS.green};
  color: ${COLORS.white};
  box-shadow: 0px 3px 3px ${COLORS.shadow.light};
  border-radius: 12px;
  margin: 4px 12px 8px 0;
  padding: 4px 12px;
`

export default Tag

export const FloatingTag = styled(Tag)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px 8px;
  pointer-events: none;
`
