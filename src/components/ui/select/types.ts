type Value = string | number | any[]

export interface IEvent<T extends Value = Value> {
  target: {
    value: T
  }
}
export interface CommonProps<T extends Value = Value> {
  style?: React.CSSProperties
  mode?: "multiple" | "single"
  options?: Item[] | []
  hidden?: boolean
  value?: T
  onChange?: (e: IEvent<T>) => void
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
  name?: string
  showSearch?: boolean
  optionLabelProp?: keyof Item
  tagLabelProp?: keyof Item
  placeholder?: string
  filterKey?: keyof Item
}

export type MultiplePropsKeys =
  | "style"
  | "options"
  | "value"
  | "name"
  | "disabled"
  | "onChange"
  | "onBlur"
  | "onFocus"
  | "optionLabelProp"
  | "tagLabelProp"
  | "filterKey"

export type SinglePropsKeys = MultiplePropsKeys | "showSearch" | "placeholder"
