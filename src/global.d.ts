interface WindowBindProperty {
  BASE_URL: string
  wsRetryConnectTimeTnterval: number
  wsRetryConnectCount: number
}

type ColorSchemeMode = "light" | "dark"

interface IReturnType<T = any> {
  data: T|null
  message: string
  code: number
  errormessage: string
}

type SetParams<T, K extends keyof T, V extends any> = {
  [P in keyof T]: P extends K ? V : T[P]
}

type GetKeyOfValue<T> = T extends { readonly value: infer V }
  ? V
  : T extends { readonly Value: infer V }
  ? V
  : never
type GetObjectValue<T extends object> = {
  [K in keyof T]: T[K]
}[keyof T]

interface WebsocketEventMap {
  close: CloseEvent
  error: Event
  message: MessageEvent
  open: Event
  retry: CustomEvent<{
    readonly retries: number
    readonly backoff: number
  }>
}

interface Columns {
  title: string
  dataIndex: string
}

interface Item {
  value: string | number
  label: string
}

type ColumnType<D> = {
  dataIndex: keyof D
  title: string | React.ReactNode
  textAlign?: "center" | "left" | "right"
  width: string
  render?: (text: string, record: D, index: number) => JSX.Element | React.ReactNode
}

type ErrorCode = "ECONNABORTED" | "ERR_NETWORK" | "ERR_BAD_REQUEST"

declare var BASE_URL: string
declare var VERSION: string
