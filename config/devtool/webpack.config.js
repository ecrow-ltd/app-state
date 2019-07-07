var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 2769,
    contentBase: "./.build",
    historyApiFallback: true
  },
  entry: "./src/devtool/index.tsx",
  output: {
    path: path.join(__dirname, ".build"),
    filename: "index.js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: `${path.resolve(".")}/public/index.html`
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader"
      }
    ]
  }
};
