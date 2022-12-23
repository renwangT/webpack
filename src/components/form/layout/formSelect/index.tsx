import React, { useState } from "react"
import { FormInputWrapper } from "@/components/styleComponents"

interface FormSelectProps {
  options?: Record<keyof Item, string>[]
  hidden?: boolean
  onChange?: (e: { target: { value: string } }) => void
  value?: string
  disabled?: boolean
  style?: React.CSSProperties
  error?: boolean
  children: JSX.Element | null
}
export const FormSelect = ({ disabled, style, error, children }: FormSelectProps) => {
  const [focus, setFocus] = useState<boolean>(false)

  const { onBlur, onFocus, mode = "single" } = children?.props || {}

  return (
    <FormInputWrapper error={!!error} style={style} disabled={!!disabled} mode={mode} focus={focus}>
      {/* <Select disabled={!!disabled} hidden={hidden} options={options} onChange={onChange} value={value} onFocus={onFocus} /> */}
      {children &&
        React.cloneElement(children, {
          ...children.props,
          onFocus() {
            setFocus(true)
            onFocus && onFocus()
          },
          onBlur() {
            setFocus(false)
            onBlur && onBlur()
          },
          disabled
        })}
    </FormInputWrapper>
  )
}

export default FormSelect
