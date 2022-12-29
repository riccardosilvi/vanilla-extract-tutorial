import { style } from "@vanilla-extract/css"
import { vars } from "../styles/theme.css"

export const wrapper = style({
  fontFamily: vars.font.body,
  backgroundColor: vars.colors.background,
  color: vars.colors.body,
  height: `100vh`,
  width: `100%`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  fontSize: vars.fontSize.md,
})
