import React, { useState } from "react"
import { FormInputWrapper } from "@/components/styleComponents"

export interface FormInputProps {
  onChange?: (e: { target: { value: string } }) => void
  value?: string
  disabled?: boolean
  style?: React.CSSProperties
  error?: boolean
  children: JSX.Element
}

export const FormInput = ({ error, disabled, style, children }: FormInputProps) => {
  const [focus, setFocus] = useState<boolean>(false)

  const { onBlur, onFocus } = children.props
  return (
    <FormInputWrapper
      style={{ ...style, overflow: "initial" }}
      disabled={!!disabled}
      error={!!error}
      focus={focus}
    >
      {children &&
        React.cloneElement(children, {
          ...children.props,
          onFocus() {
            setFocus(true)
            onFocus && onFocus()
          },
          disabled,
          onBlur() {
            setFocus(false)
            onBlur && onBlur()
          }
        })}
    </FormInputWrapper>
  )
}

export default FormInput
