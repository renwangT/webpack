const presets = [
  [
    "@babel/preset-env",
    {
      modules: false,
      useBuiltIns: "usage",
      corejs: "3.24",
      targets: {
        chrome: "49",
        ios: "10",
        android: "5.0"
      }
    }
  ],
  [
    "@babel/preset-react",
    {
      runtime: "automatic"
    }
  ],
  "@babel/preset-typescript"
]

const plugins = [
  ["import", { libraryName: "antd-mobile", libraryDirectory: "es/components", style: false }],
  [
    "@babel/plugin-transform-runtime",
    {
      regenerator: true
    }
  ],
  [
    "styled-components-px2vw",
    {
      viewportWidth: 750,
      unitToConvert: "px",
      unitPrecision: 5,
      minPixelValue: 1,
      exclude: [/node_modules/]
    }
  ],
  "styled-components"
]

if (process.env.NODE_ENV === "production") {
  plugins.push(["transform-remove-console", { exclude: ["error", "warn", "info"] }])
} else {
  plugins.push(["react-refresh/babel", { skipEnvCheck: true }])
}

module.exports = {
  presets,
  plugins
}
