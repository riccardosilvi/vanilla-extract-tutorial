import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles"
import { breakpoints, vars } from "./theme.css"

const { space, colors, fontSize, radii, boxShadow } = vars


const unresponsiveProperties = defineProperties({
  properties: {
    fontSize,
    lineHeight: fontSize,
    textAlign: [`center`, `left`, `right`],
    textTransform: [`lowercase`, `uppercase`],
    fontWeight: [400, 500, 600, 700, 800],
    textDecoration: [`none`, `underline`],
    borderRadius: radii,
    boxShadow,
  },
})
