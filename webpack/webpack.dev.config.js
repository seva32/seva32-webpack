/* eslint-disable import/no-extraneous-dependencies */
import webpack from "webpack";
import path from "path";
import HTMLWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackPrerenderPlugin from "html-webpack-prerender-plugin";
// import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import config from "./webpack.config.babel";

export default {
  devtool: "inline-source-map",

  entry: {
    app: [
      "react-hot-loader/patch",
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
      ...config.entry.app,
    ],
  },

  output: config.output,

  mode: "development",

  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "babel-plugin-syntax-dynamic-import":
        "@babel/plugin-syntax-dynamic-import",
      react: path.resolve("./node_modules/react"),
    },
    ...config.resolve,
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
          options: {
            fix: true,
            failOnWarning: false,
            failOnError: false,
          },
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localsConvention: "camelCase",
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      ...config.module.rules,
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve("build/index.html"),
      minify: { collapseWhitespace: false },
    }),
    new HtmlWebpackPrerenderPlugin({ main: "#root" }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    // new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["build"] }),
    ...config.plugins,
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
