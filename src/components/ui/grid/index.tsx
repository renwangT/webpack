import React from "react"
import styled from "styled-components"

type SonLayout = "start" | "end" | "center" | "stretch"

export const Item = ({ children }: { children?: JSX.Element[] | JSX.Element }) => {
  return <GridItem>{children}</GridItem>
}
interface Props {
  columns: number | string
  gap?: number | string | [number | string, number | string]
  justifyItems?: SonLayout
  alignItems?: SonLayout
  children?: JSX.Element[] | JSX.Element
}

const GridItem = styled.div`
  overflow: hidden;
`

const GridWrapper = styled.div<{
  columns: string | number
  gap: string | number
  justifyItems: SonLayout
  alignItems: SonLayout
}>`
  display: grid;
  grid-template-columns: ${props => {
    if (typeof props.columns === "number") {
      return `repeat(${props.columns},1fr)`
    } else {
      return props.columns
    }
  }};
  grid-gap: ${props => props.gap};
  justify-items: ${props => props.justifyItems};
  align-items: ${props => props.alignItems}; ;
`

export class Grid extends React.PureComponent<Props> {
  static Item: typeof Item
  render() {
    const { gap, justifyItems = "stretch", alignItems = "stretch", children, columns } = this.props
    let gapd: string | number
    if (Array.isArray(gap)) {
      gapd = `${gap[0]} ${gap[1]}`
    } else if (typeof gap === "number") {
      gapd = gap + "px"
    } else {
      gapd = gap || 0
    }
    return (
      <GridWrapper justifyItems={justifyItems} alignItems={alignItems} columns={columns} gap={gapd}>
        {children}
      </GridWrapper>
    )
  }
}

Grid.Item = Item
export default Grid
