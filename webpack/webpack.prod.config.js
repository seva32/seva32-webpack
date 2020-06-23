// eslint-disable-next-line import/no-extraneous-dependencies
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("./webpack.config");

// const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  devtool: "source-map",

  entry: config.entry,

  resolve: config.resolve,

  output: config.output,

  mode: "production",

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve("src/index.html"),
      minify: { collapseWhitespace: true },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
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
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localsConvention: "camelCase",
              sourceMap: false,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
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
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localsConvention: "camelCase",
              sourceMap: false,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      ...config.module.rules,
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: "styles",
  //         test: /\.css$/,
  //         chunks: "all",
  //         enforce: true,
  //       },
  //       vendor: {
  //         chunks: "initial",
  //         test: "vendor",
  //         name: "vendor",
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
};
