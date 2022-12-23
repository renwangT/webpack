import ReatDom from "react-dom"
import { SelectStyle } from "@/components/styleComponents"

export const PullSelect = ({
  visible,
  width,
  top,
  left,
  options,
  onSelect,
  activedIndex,
  hidden
}: {
  visible: boolean
  width: number
  top: number
  left: number
  options: string[]
  onSelect(v: string): void
  activedIndex: number
  hidden?: boolean
}) => {
  const len = options.length
  const optionsItem = 40
  const h = visible ? (len > 10 ? 10 * optionsItem : len * optionsItem) : 0
  return ReatDom.createPortal(
    <SelectStyle.OptionsWrapper height={h} width={width} top={top} left={left} hidden={!!hidden}>
      {options.map((item, index) => {
        return (
          <SelectStyle.Option
            height={40}
            key={item}
            actived={activedIndex > -1 ? activedIndex === index : index === 0}
            onMouseDown={e => {
              e.stopPropagation()
              const val = activedIndex > -1 ? options[activedIndex] : item
              onSelect(val)

              // onEnter && onEnter(val)
            }}
          >
            <p>{item}</p>
          </SelectStyle.Option>
        )
      })}
    </SelectStyle.OptionsWrapper>,
    document.body
  )
}

export default PullSelect
