require("dotenv").config({ silent: true });

const webpack = require("webpack");
const path = require("path");
const { ReactLoadablePlugin } = require("react-loadable/webpack");
const ReactLoadableSSRAddon = require("react-loadable-ssr-addon");

module.exports = {
  entry: {
    vendor: ["semantic-ui-react"],
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

  // plugins: [
  //   new webpack.EnvironmentPlugin({
  //     NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
  //     DEBUG: false,
  //   }),
  //   new ReactLoadablePlugin({
  //     filename: "build/react-loadable.json",
  //   }),
  // ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
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
  optimization: {
    nodeEnv: "development",
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
  plugins: [
    new ReactLoadableSSRAddon({
      filename: "react-loadable-ssr-addon.json",
    }),
    new webpack.DefinePlugin({
      "process.env.BROWSER": JSON.stringify(true),
    }),
  ],
};
