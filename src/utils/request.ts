import axios, { AxiosRequestConfig, AxiosPromise } from "axios"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Toast } from "@/components"

export const request = axios.create({
  baseURL: window.BASE_URL + "/api",
  timeout: 10000
})
export function handleRequest<R extends IReturnType = IReturnType>(callback: () => AxiosPromise<R>): Promise<R["data"]> {
  return callback().then(res => res.data.data).catch(err => {
    if (typeof err === "string") {
      Toast.error({ content: err })
    }
    if (typeof err === "object") {
      const { message } = err as R
      message &&
        Toast.error({
          content: message ||"err"
        })
    }
    return Promise.reject(err)
  })
}

request.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  // if (!navigator.onLine) return
  const language = localStorage.getItem("i18nextLng")
  const token = JSON.parse(window.localStorage.getItem("store") || "{}")?.userInfo?.token
  const headers = {}
  if (token) {
    Object.assign(headers, { token })
  }
  if (language) {
    Object.assign(headers, { language })
  }
  if (config.headers) {
    Object.assign(config.headers, headers)
  }
  NProgress.start()
  Toast.loading()
  return config
})
request.interceptors.response.use(
  config => {
    console.log("request data:", config)
    NProgress.done()
    Toast.clear()
    if (config.data.code !== 0) {
      return Promise.reject(config.data)
    }
    return config
  },
  error => {
    console.error("error:", error)
    NProgress.done()
    Toast.clear()
    return Promise.reject(error)
  }
)
