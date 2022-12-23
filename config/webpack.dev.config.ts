import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { merge } from "webpack-merge"
import webpackBase from "./webpack.base.config"

import type { WebpackConfig } from "./webpack.base.config"

export default merge<WebpackConfig>(webpackBase, {
  mode: "development",
  devtool: "cheap-module-source-map",
  target: "web",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"]
      }
    ]
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    hot: true,
    // host: "local-ip",
    port: 9000,
    // static: {
    //   directory: path.join(__dirname, "../public"),
    // },
    open: true,
    // proxy: {
    //   "/api": {
    //     target: config.BASE_URL,
    //     changeOrigin: true,
    //     pathRewrite: (path: string) => path.replace(/^\/api/, ""),
    //     secure: false
    //   }
    // },
    compress: true,
    // progress: true,
    // client: {
    //   progress: true
    // },
    historyApiFallback: true
  }
})
