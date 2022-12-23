import { request, handleRequest } from "@/utils"

export const getDeviceStatus = (params: IGetDeviceParams) => {
  return handleRequest<IReturnType<null>>(() =>
    request({
      url: "/iGT/Truck/DeviceStatue",
      method: "post",
      data: params
    })
  )
}
