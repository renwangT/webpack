// 错误边界: ErrorBoundary.js文件
import { Component } from "react"
import ErrorBlock from "@/components/errorBlock"
import styled from "styled-components"

const ErrorBox = styled.div`
  height: 100%;
  position: relative;
`
const Error = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
`

export class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBox>
          <Error>
            <ErrorBlock status="default" />
          </Error>
        </ErrorBox>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
