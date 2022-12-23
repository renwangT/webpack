import styled from "styled-components"
import ReactDom from "react-dom"

import { SelectStyle } from "../../styleComponents"
import { Checked } from "../../icons"

import type { CommonProps } from "./types"

type PickPropsKeys = "options" | "hidden" | "value" | "optionLabelProp"

type ValueType = string | number
interface IProps extends Pick<CommonProps, PickPropsKeys> {
  visible: boolean
  onSelect(val: string | number): void
  top: number
  left: number
  width: number
}

const ScrollBox = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

export const PullList = (props: IProps) => {
  const {
    visible,
    hidden,
    options = [],
    value,
    onSelect,
    top,
    left,
    width,
    optionLabelProp = "label"
  } = props

  const isChecked = (val: ValueType) => {
    if (Array.isArray(value)) {
      return value.indexOf(val) > -1
    } else {
      return val === value
    }
  }
  const len = options.length
  const optionsItem = 40
  const h = visible ? (len > 10 ? 10 * optionsItem : len * optionsItem) : 0
  return ReactDom.createPortal(
    <SelectStyle.OptionsWrapper
      height={h}
      top={top}
      left={left}
      width={width < 100 ? 100 : width}
      hidden={!!hidden}
    >
      <ScrollBox>
        {(options || []).map(item => {
          return (
            <SelectStyle.Option
              height={optionsItem}
              key={item.value}
              actived={isChecked(item.value)}
              onMouseDown={e => {
                e.stopPropagation()
                e.preventDefault()
                onSelect(item.value)
              }}
            >
              <p>{item[optionLabelProp]}</p>
              {isChecked(item.value) && <Checked />}
            </SelectStyle.Option>
          )
        })}
      </ScrollBox>
    </SelectStyle.OptionsWrapper>,
    document.body
  )
}

export default PullList
