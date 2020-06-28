import dotenv from "dotenv";

import webpack from "webpack";
import path from "path";
import ReactLoadableSSRAddon from "react-loadable-ssr-addon";
import { DuplicatesPlugin } from "inspectpack/plugin";

dotenv.config({ silent: true });

export default {
  entry: {
    vendor: ["semantic-ui-react", "styled-components"],
    app: [path.resolve("src/index.jsx")],
  },

  output: {
    path: path.resolve("build"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
    globalObject: "this",
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ReactLoadableSSRAddon({
      filename: "react-loadable-ssr-addon.json",
    }),
    new webpack.DefinePlugin({
      "process.env.BROWSER": JSON.stringify(true),
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5,
    }),
    new DuplicatesPlugin({
      emitErrors: false,
      verbose: true,
    }),
  ],
};
