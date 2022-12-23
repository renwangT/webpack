import { createRoot } from "react-dom/client"
import { Message } from "./Message"
import { Loading } from "./Loading"
import type { MessageProps } from "./Message"
// type MessageProps = any
export type MethodProps = Pick<MessageProps, "content" | "cancelText" | "okText"> &
  Partial<Pick<MessageProps, "duration" | "onClose">>
export type TFunConfirm = Pick<MessageProps, "onConfirm">

class CustomToast {
  public loadingDom: null | HTMLDivElement = null
  public loadingCount = 0
  onClose(aBox: HTMLDivElement) {
    if (aBox) {
      setTimeout(() => {
        try {
          document.body.removeChild(aBox)
        } catch (e) {
          console.error(e)
        }
      }, 500)
    }
  }

  loading() {
    this.loadingCount += 1
    if (this.loadingDom) return
    this.loadingDom = document.createElement("div")
    const root = createRoot(this.loadingDom as HTMLDivElement)
    root.render(<Loading />)
    document.body.appendChild(this.loadingDom)
  }

  clear() {
    this.loadingCount--
    if (this.loadingDom && this.loadingCount === 0) {
      document.body.removeChild(this.loadingDom)
      this.loadingDom = null
    }
  }

  show(args: Omit<MessageProps, "onClose"> & TFunConfirm & Pick<MethodProps, "onClose">) {
    const aBox = document.createElement("div")
    // 定义组件，
    const root = createRoot(aBox)
    const JSXdom = (
      <Message
        onClose={() => {
          if (args.onClose) {
            const result = args.onClose()
            if (result instanceof Promise) {
              result
                .then(() => {
                  this.onClose(aBox)
                })
                .catch(err => {
                  console.error(err)
                })
            } else {
              this.onClose(aBox)
            }
          } else {
            this.onClose(aBox)
          }
        }}
        {...args}
      />
    )

    // 渲染DOM
    root.render(JSXdom)
    // 置入到body节点下
    document.body.appendChild(aBox)
  }

  success(params: MethodProps) {
    this.show({ duration: 3000, ...params, type: "success" })
  }

  warn(params: MethodProps & Partial<TFunConfirm>) {
    this.show({ duration: 3000, ...params, type: "warning" })
  }

  error(params: MethodProps) {
    this.show({ duration: 3000, ...params, type: "error" })
  }
}

export const Toast = new CustomToast()
