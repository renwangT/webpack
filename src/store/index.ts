import resso from "resso"
import { defaultValues, deviceAspectRatio, copyObj } from "./data"
import type { Resso, InitalState } from "./types"

const beforestore = window.localStorage.getItem("store")

let oldStore: InitalState = beforestore ? JSON.parse(beforestore) : copyObj(defaultValues)
if (oldStore?.application?.version !== defaultValues.application.version) {
  oldStore = {
    ...copyObj(defaultValues),
    deviceInfo: {
      ...defaultValues.deviceInfo,
      deviceType: oldStore.deviceInfo.deviceType,
      deviceNo: oldStore.deviceInfo.deviceNo,
      terminalNo: oldStore.deviceInfo.terminalNo
    }
  }
}

const initialState: InitalState = oldStore

initialState.deviceInfo.deviceAspectRatio = deviceAspectRatio

window.localStorage.setItem("store", JSON.stringify(initialState))

const store = (resso as Resso)<InitalState>(initialState)
// const store = resso(initialState)

export const dispatch = <K extends keyof InitalState>(key: K, values?: Partial<InitalState[K]>) => {
  store[key] = {
    ...store[key],
    ...(values || copyObj(defaultValues[key]))
  }
  window.localStorage.setItem("store", JSON.stringify(store))
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve("ok")
    }, 200)
  })
}

export default store
