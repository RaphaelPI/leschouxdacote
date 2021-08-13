import Switch from "@material-ui/core/Switch"
import { withStyles } from "@material-ui/core/styles"

import { COLORS } from "src/constants"

const CustomSwitch = withStyles({
  switchBase: {
    color: COLORS.green,
    "&$checked": {
      color: COLORS.green,
    },
    "&$checked + $track": {
      backgroundColor: COLORS.green,
    },
  },
  checked: {},
  track: {},
})(Switch)

export default CustomSwitch
