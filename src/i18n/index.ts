import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"
// import en from "./en-us.json"
// import zh from "./zh-cn.json"

i18n
  .use(LanguageDetector) // 嗅探当前浏览器语言
  .use(initReactI18next) // init i18next
  .use(Backend)
  .init({
    // 引入资源文件
    // 选择默认语言，选择内容为上述配置中的key，即en/zh
    fallbackLng: ["zh-CN"],
    debug: false,
    backend: {
      loadPath(lngs: string[], ns: string[]) {
        // console.log("lngs: ", lngs)
        // console.log("ns: ", ns)
        if (!/-/.test(lngs[0])) return ""
        return `/locales/${lngs[0]}/${[ns[0]]}.json`
      }
    },
    // have a common namespace used around the full app
    ns: ["translate"],
    defaultNS: "translate",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    detection: {
      caches: ["localStorage", "sessionStorage", "cookie"]
    }
  })

export default i18n
