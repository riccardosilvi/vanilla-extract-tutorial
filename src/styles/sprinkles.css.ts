import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles"
import { breakpoints, vars } from "./theme.css"

const { space, colors, fontSize, radii, boxShadow } = vars

// you can just provide properties ( like creating a TS Css props interface )
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

// you can create condition states by providing defaults
// NOTE
// each condition generate a class so try to keep as many props not conditional
const colorProperties = defineProperties({
  conditions: {
    light: {
      "@media": `(prefers-color-scheme: light)`,
    },
    dark: { "@media": `(prefers-color-scheme: dark)` },
    hover: { selector: `&:hover` },
    focus: { selector: `&:focus` },
  },
  // since the themes cannot coexist you can set multiple defaults
  defaultCondition: [`light`, `dark`],
  properties: {
    color: colors,
    background: colors,
    borderColor: colors,
  },
})

// creates media just for breakpoints > 0
function transformBreakpoints<Output>(input: Record<string, any>) {
  let responsiveConditions!: Output

  Object.entries(input).forEach(([key, value]) => {
    if (value === 0) {
      responsiveConditions = {
        ...responsiveConditions,
        [key]: {},
      }
    } else {
      responsiveConditions = {
        ...responsiveConditions,
        [key]: {
          "@media": `screen and (min-width: ${value}px)`,
        },
      }
    }
  })

  return responsiveConditions
}


const responsiveProperties = defineProperties({
  conditions: transformBreakpoints<{ mobile: {}; tablet: {}; desktop: {} }>(
    breakpoints
  ),
  defaultCondition: `mobile`,
  // this defines the order of responsive stages ( it equals ordered breakpoints keys from lower to higher)
  responsiveArray: [`mobile`, `tablet`, `desktop`],
  // properties which will accept responsive entries ( much like styled-system )
  properties: {
    position: [`relative`],
    display: [`none`, `block`, `inline`, `inline-block`, `flex`],
    alignItems: [`flex-start`, `center`, `flex-end`, `baseline`],
    justifyContent: [`flex-start`, `center`, `flex-end`, `space-between`],
    flexDirection: [`row`, `row-reverse`, `column`, `column-reverse`],
    flexWrap: [`wrap`, `nowrap`],
    padding: space,
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    margin: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
  },
  // this composes rules and must be ordered!
  // "px" and "py" are after "p" so they can override it
  shorthands: {
    p: [`paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`],
    px: [`paddingLeft`, `paddingRight`],
    py: [`paddingTop`, `paddingBottom`],
    m: [`marginTop`, `marginBottom`, `marginLeft`, `marginRight`],
    mx: [`marginLeft`, `marginRight`],
    my: [`marginTop`, `marginBottom`],
  },
})

// this function will be the one to use in the project to access properties
export const sprinkles = createSprinkles(
  responsiveProperties,
  colorProperties,
  unresponsiveProperties
)
export type Sprinkles = Parameters<typeof sprinkles>[0]
