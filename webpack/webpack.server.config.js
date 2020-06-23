const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const config = require("./webpack.config");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  devtool: "inline-source-map",

  target: "node",

  entry: {
    app: path.resolve("src/App"),
    rootReducer: path.resolve("src/reducers/index"),
  },

  mode: devMode ? "development" : "production",

  resolve: config.resolve,

  output: {
    ...config.output,
    filename: "[name].server.js",
    libraryTarget: "commonjs",
  },

  externals: ["react-helmet-async"],

  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    ...config.plugins,
  ],

  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
            },
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development",
            },
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
          "sass-loader",
        ],
      },
      ...config.module.rules,
    ],
  },
};
