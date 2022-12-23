import resolveApp from "./path"
import webpack from "webpack"
import Webpackbar from "webpackbar"
import HtmlWebpackPlugin from "html-webpack-plugin"
import Server from "webpack-dev-server"
// import CopyWebpackPlugin from "copy-webpack-plugin"
import { version } from "../package.json"
// import NotifierPlugin from "friendly-errors-webpack-plugin"
// import notifier from "node-notifier"

import type { Configuration } from "webpack"

// const ICON = resolveApp("public/Webpack.png")
export interface WebpackConfig extends Configuration {
  devServer?: Server.Configuration
}

const webpackBase: WebpackConfig = {
  cache: {
    type: "filesystem"
  },
  entry: {
    main: "./src/index.tsx"
  },
  output: {
    path: resolveApp("./dist"),
    publicPath: "/",
    filename: "js/[name].[chunkhash:8].js",
    assetModuleFilename: "images/[name].[hash][ext][query]",
    clean: true
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 表示在import 文件时文件后缀名可以不写
    alias: {
      "@": resolveApp("./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        include: resolveApp("./src"),
        use: ["thread-loader", "babel-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|woff|woff2|eot|ttf|otf)$/i,
        type: "asset",
        exclude: /node_modules/,
        include: resolveApp("./src"),
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 4kb
          }
        }
      }
    ]
  },
  plugins: [
    new Webpackbar(),
    new webpack.DefinePlugin({
      BASE_URL: "'/'",
      VERSION: JSON.stringify(version),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      // publicPath: path.resolve(__dirname, "dist"),
      template: resolveApp("./public/index.html"),
      title: "IGT"
    })
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: resolveApp("./public/favicon.ico"),
    //       to: resolveApp("./dist/favicon.ico")
    //     },
    //     {
    //       from: resolveApp("./public/locales"),
    //       to: resolveApp("./dist/locales")
    //     }
    //   ]
    // })
    // new NotifierPlugin({
    //   onErrors: (severity: any, errors: any) => {
    //     if (severity !== "error") {
    //       return
    //     }
    //     const error = errors[0]
    //     notifier.notify({
    //       title: "Webpack error",
    //       message: severity + ": " + error.name,
    //       subtitle: error.file || "",
    //       icon: ICON
    //     })
    //   }
    // })
  ]
}

export default webpackBase
