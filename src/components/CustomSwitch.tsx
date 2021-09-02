import Switch from "@mui/material/Switch"
import styled from "@emotion/styled"

import { COLORS } from "src/constants"

const CustomSwitch = styled(Switch)`
  .Mui-checked {
    color: ${COLORS.green} !important;
  }
  .Mui-checked + .MuiSwitch-track {
    background-color: ${COLORS.green} !important;
  }
`

export default CustomSwitch
