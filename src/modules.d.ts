import axios, { Axios, AxiosRequestConfig, AxiosPromise } from "axios"

declare module "axios" {
  interface AxiosInstance extends Axios {
    <D, R>(config: AxiosRequestConfig<D>): AxiosPromise<R>
    <D, R>(url: string, config?: AxiosRequestConfig<D>): AxiosPromise<R>
  }
}

interface CallAndroidFunciton {
  callNative: {
    speak(v: string): void
    getDeviceInfo(): string
    scanQrcode(): void
    takePhoto(): void
  }
}

declare global {
  interface Window extends WindowBindProperty, CallAndroidFunciton {
    scanQrcodeResult(path: string): void
    takePhotoResult(imgPath: string): void
  }
}
