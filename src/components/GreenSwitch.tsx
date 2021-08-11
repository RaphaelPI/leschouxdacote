import React from "react"
import FormControlLabel from "@material-ui/core/FormControlLabel"
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

interface GreenSwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  handleChange: () => void
  name: string
  label?: string
  margin: string
}

const GreenSwitch: React.FC<GreenSwitchProps> = ({ checked, defaultChecked, handleChange, name, label, margin }) => {
  return (
    <FormControlLabel
      control={
        <CustomSwitch {...(defaultChecked ? { defaultChecked } : { checked })} onChange={handleChange} name={name} />
      }
      label={label ?? ""}
      labelPlacement="start"
      style={{ margin }}
    />
  )
}

export default GreenSwitch
