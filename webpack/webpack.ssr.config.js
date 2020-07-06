import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import HtmlWebpackPrerenderPlugin from "html-webpack-prerender-plugin";
// import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import config from "./webpack.config.babel";

const devMode = process.env.NODE_ENV !== "production";

export default {
  devtool: "source-map",

  target: "node",

  entry: {
    server: path.resolve("server/server"),
  },

  output: {
    ...config.output,
    filename: "[name].server.js",
    libraryTarget: "umd",
  },

  mode: devMode ? "development" : "production",

  resolve: config.resolve,

  externals: [nodeExternals()],

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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve("src/index.html"),
      // minify: { collapseWhitespace: false },
    }),
    new HtmlWebpackPrerenderPlugin({ main: "#root" }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    // new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["build"] }),
    ...config.plugins,
  ],
};
