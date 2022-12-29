import { style, styleVariants } from "@vanilla-extract/css"
import { vars } from "../styles/theme.css"
// Rest of styles...


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

export const innerWrapper = style({
  maxWidth: `1200px`,
  width: `100%`,
  padding: vars.space.lg,
})

export const topBar = style({
  display: `flex`,
  justifyContent: `space-between`,
  alignItems: `center`,
  marginBottom: vars.space.lg,
})

export const button = style({
  border: `none`,
  background: `none`,
  color: vars.colors.link,
  borderWidth: `1px`,
  borderStyle: `solid`,
  borderColor: `transparent`,
  transition: `all 0.3s ease-in-out`,
  borderRadius: vars.radii.sm,
  paddingLeft: vars.space.sm,
  paddingRight: vars.space.sm,
  selectors: {
    "&:hover": {
      color: vars.colors.linkHover,
      cursor: `pointer`,
      borderColor: vars.colors.linkHover,
    },
  },
})

// creating base styles for variants is as simple as
// 1. create a "base" styles rules set
// 2. compose base styles with custom through styles variants
const topBarHeadingBase = style({
  fontSize: vars.fontSize.lg,
  fontWeight: 700,
})

// you can compose styles by hardcoding each theme name
export const topBarHeading = styleVariants({
  light: [topBarHeadingBase, { color: `black` }],
  dark: [topBarHeadingBase, { color: `white` }],
})

const footerBase = style({
  fontSize: vars.fontSize.sm,
  textAlign: `center`,
  marginTop: vars.space.xl,
})

const footerColors = {
  light: vars.colors.gray600,
  dark: vars.colors.gray400,
}

// or through the map functionality
// https://vanilla-extract.style/documentation/api/style-variants/#mapping-variants
export const footer = styleVariants(footerColors, (color) => [
  footerBase,
  { color },
])
