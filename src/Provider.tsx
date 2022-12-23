import { ThemeProvider } from "styled-components"
import { THEMECONFIG } from "./theme.config"

import store from "./store"

import type { ThemeProviderComponent } from "styled-components"
import type { ThemeType } from "./theme.config"

const CustomThemeProvider: ThemeProviderComponent<ThemeType, any> = ThemeProvider

const ColorSchemeModes = {
  light: 0,
  dark: 1
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { mode } = store
  return (
    <CustomThemeProvider theme={{ ...THEMECONFIG[ColorSchemeModes[mode.theme]] }}>
      {children}
    </CustomThemeProvider>
  )
}

export default Provider
