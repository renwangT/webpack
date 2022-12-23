export const THEMECONFIG = [
  {
    name: "light",
    primary: "#5B97FB",
    color: {
      error: "red",
      primary: "#355ede",
      bgPrimary: "#eee",
      borderPrimary: "#d2d2d2",
      headBgPrimary: "#0B0B0B",
      deepBgPrimary: "#fff",
      menuBorderPrimary: "#d2d2d2",
      menuBgPrimary: "#dfdfdf",
      txtPrimary: "#333",
      cardBgPrimary: "#fff",
      cardEvenBgPrimary: "#fff",
      cardBorderPrimary: "#d2d2d2",
      inputWrapperBgPrimary: "#DFDFDF",
      stepsBgPrimary: "#fff",
      yardBayCellBgPrimary: "#bbb",
      activedBgPrimary: "#3086ff9e",
      loadingPrimary: "#355EDE"
    }
  },
  {
    name: "dark",
    color: {
      error: "#fa5151",
      primary: "#5B97FB",
      bgPrimary: "#3E3F48",
      borderPrimary: "#343540",
      headBgPrimary: "#0B0B0B",
      deepBgPrimary: "#21222E",
      menuBorderPrimary: "#21222E",
      menuBgPrimary: "#21222E",
      txtPrimary: "#fff",
      cardBgPrimary: "#21222E",
      cardEvenBgPrimary: "#4C4D56",
      cardBorderPrimary: "#21222E",
      inputWrapperBgPrimary: "#21222E",
      stepsBgPrimary: "#292A33",
      yardBayCellBgPrimary: "#2E2F37",
      activedBgPrimary: "#000000e6",
      loadingPrimary: "#fff"
    }
  }
] as const

export type ThemeType = typeof THEMECONFIG[number]
