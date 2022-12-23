import React, { forwardRef } from "react"
import store from "@/store"

import MultipleSelect from "./MultipleSelect"
import SingleSelect from "./SingleSelect"
import PopupSelect from "./PopupSelect"
import PopupMultipleSelect from "./PopupMultipleSelect"

import type { CommonProps } from "./types"

export const Select = forwardRef<HTMLInputElement | React.RefCallback<any> | null, CommonProps>(
  function Component(props, ref) {
    const { deviceAspectRatio } = store.deviceInfo
    const {
      mode = "single",
      tagLabelProp,
      filterKey,
      value,
      showSearch,
      placeholder,
      ...extraProps
    } = props

    if (deviceAspectRatio >= 1) {
      if (mode === "multiple") {
        return (
          <MultipleSelect
            {...extraProps}
            tagLabelProp={tagLabelProp}
            value={value as any[]}
            filterKey={filterKey}
            ref={ref}
          />
        )
      } else {
        return (
          <SingleSelect
            {...extraProps}
            showSearch={showSearch}
            placeholder={placeholder}
            filterKey={filterKey}
            value={value as string | number}
            ref={ref}
          />
        )
      }
    } else {
      if (mode === "multiple") {
        return (
          <PopupMultipleSelect
            {...extraProps}
            tagLabelProp={tagLabelProp}
            value={value as any[]}
            ref={ref}
          />
        )
      } else {
        return (
          <PopupSelect
            {...extraProps}
            placeholder={placeholder}
            value={value as string | number}
            ref={ref}
          />
        )
      }
    }
  }
)

export default Select
