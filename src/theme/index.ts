import { extendTheme } from "@chakra-ui/react"
import styles from "./global"
import components from "./componentsTheme"
import getTheme from "./getTheme"
import getHost from "../utils/getHost"

const host = getHost()
const hostname = host.hostname
const customTheme = getTheme(hostname)

const theme = extendTheme({
  ...customTheme,
  styles,
  components,
  colors: {
    ...customTheme.colors
  }
})

export { theme, customTheme }
