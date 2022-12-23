import "react-i18next"
// react-i18next versions higher than 11.11.0
const defaultNS = "translate" as const

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: {
      [k in typeof defaultNS]: IResources
    }
  }
}
