import { Toast as CustomToast } from "./Toast"
import type { MethodProps, TFunConfirm } from "./Toast"

export const Toast = {
  loading() {
    CustomToast.loading()
  },
  success(args: MethodProps) {
    CustomToast.success(args)
  },
  error(args: MethodProps) {
    CustomToast.error(args)
  },
  warn(args: MethodProps & Partial<TFunConfirm>) {
    CustomToast.warn(args)
  },
  clear() {
    CustomToast.clear()
  }
}
