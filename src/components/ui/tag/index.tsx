import styled, { css } from "styled-components"
import { pxTovw } from "@/utils"

const CloseIcon = ({ onClick }: { onClick(): void; disabled: boolean }) => (
  <a
    className="close-icon"
    onClick={e => {
      e.stopPropagation()
      // onClick()
    }}
    onMouseDown={e => {
      e.stopPropagation()
      onClick()
    }}
  >
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="close"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
    </svg>
  </a>
)
const TagBox = styled.div<{ disabled: boolean }>`
  display: inline-flex;
  height: 38px;
  line-height: 38px;
  align-items: center;
  background: ${props => (props.disabled ? "#d2d2d2" : "#f5f5f5")};
  margin: 5px 0;
  margin-right: 5px;
  margin-top: 0;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  font-size: 24px;
  overflow: hidden;
  .close-icon {
    cursor: pointer;
    ${props =>
      props.disabled &&
      css`
        cursor: not-allowed;
      `}
    margin-right: 5px;
    svg {
      fill: #00000073;
      vertical-align: middle;
      margin-bottom: 5px;
    }
  }
  .close-icon:hover {
    svg {
      fill: ${props => (props.disabled ? "#00000073" : "#000000bf")};
    }
  }
  @media only screen and (min-width: 750px) {
    margin: ${pxTovw(5, 1280)} 0;
    margin-right: ${pxTovw(5, 1280)};
    margin-top: 0;
    height: ${pxTovw(38, 1280)};
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: ${pxTovw(6, 1280)};
    font-size: ${pxTovw(20, 1280)};
    .close-icon {
      margin-right: ${pxTovw(5, 1280)};
      svg {
        margin-bottom: ${pxTovw(3, 1280)};
      }
    }
  }
`
const Text = styled.div<{ disabled: boolean }>`
  width: 80%;
  margin: 0 5px;
  color: ${props => (props.disabled ? "#808080" : "currentColor")};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media only screen and (min-width: 750px) {
    margin: 0 ${pxTovw(5, 1280)};
  }
`
type TagProps = {
  children?: string | number
  onClose?: () => void
  disabled?: boolean
}

export const Tag = ({ children, onClose, disabled = false }: TagProps) => {
  return (
    <TagBox disabled={disabled}>
      <Text className="txt" disabled={disabled} title={String(children)}>
        {children}
      </Text>
      {onClose && (
        <CloseIcon
          disabled={disabled}
          onClick={() => {
            !disabled && onClose()
          }}
        />
      )}
    </TagBox>
  )
}
