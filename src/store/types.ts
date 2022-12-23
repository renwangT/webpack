import type { VesselData } from "@/service/vesselList/types"

export interface Resso {
  <T extends object>(state: T): T
}

export interface InitalState {
  ws: {
    open: boolean
  }
  qc: {
    qcNo: string
    qcDriver: string
    contractCode: string
    berthNo: string
    /**
     * @tag QC 虚拟栏
     */
    qcVirtualLane: string
    stopWork: "Y" | "N"
  }
  mode: {
    theme: ColorSchemeMode
  }
  network: {
    online: boolean
  }
  vesselInfo: VesselData
  deviceInfo: {
    clientHeight: number
    clientWidth: number
    /**
     * @tag 设备宽高比
     */
    deviceAspectRatio: number
    deviceType: DeviceType
    deviceNo: string
    /**
     * @tag 设备编号
     */
    terminalNo: string
    isHalt: DeviceStatus["ISHALT"]
    isUsable: DeviceStatus["ISUSABLE"]
    notifys: NotifyType[]
  }
  userInfo: {
    userName: string
    token: string
    language: string
    auths: string[]
  }
  page: {
    /**
     * @tag 页面刷新标识 +++
     */
    refresh: number
    title: string
  }
  application: {
    version: string
    envDesc: string
  }
}
