import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

import { GlobalStyle } from "@/components/styleComponents"
import { ErrorBoundary } from "@/components/errorBoundary"

import Provider from "./Provider"


import "./i18n"

// if (process.env.NODE_ENV !== "production") {
// import("vconsole").then(Module => {
//   const VConsole = Module.default
//   const vConsole = new VConsole()
//   console.log(vConsole)
// })
// }
const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)

root.render(
  <BrowserRouter>
    <React.StrictMode>
    <Provider>
      <GlobalStyle />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
    </React.StrictMode>
  </BrowserRouter>
)