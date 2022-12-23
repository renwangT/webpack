import type { InitalState } from "./types"

export const deviceAspectRatio = document.documentElement.clientWidth >= 750 ? 1 : 0

export const defaultValues: InitalState = {
  qc: {
    qcNo: "",
    qcDriver: "",
    contractCode: "",
    berthNo: "",
    qcVirtualLane: "",
    stopWork: "N"
  },
  ws: {
    open: false
  },
  mode: {
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  },
  network: {
    online: (window.localStorage.getItem("netWork") || "online") === "online"
  },
  vesselInfo: {
    BerthNo: "",
    BerthplanNo: "",
    Contractor: "",
    InBoundvoy: "",
    IsCheckBerth: "",
    OutBoundvoy: "",
    VesselAlias: "",
    VesselChName: "",
    VesselEnName: "",
    VesselName: "",
    VesselType: "S"
  },
  deviceInfo: {
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
    deviceAspectRatio,
    deviceType: "T",
    deviceNo: "",
    terminalNo: "",
    isHalt: "N",
    isUsable: "Y",
    notifys: []
  },
  userInfo: {
    userName: "",
    token: "",
    language: "",
    auths: []
  },
  page: {
    refresh: 0,
    title: ""
  },
  application: {
    version: VERSION,
    envDesc: ""
  }
}

export const copyObj = <O extends Record<PropertyKey, any>>(obj: O): O =>
  JSON.parse(JSON.stringify(obj))
