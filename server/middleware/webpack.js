import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack/webpack.dev.config";

const compiler = webpack(config);
const devEnv = process.env.NODE_ENV !== "production";
const devMiddleware = devEnv
  ? webpackDevMiddleware(compiler, {
    contentBase: "build",
    stats: { colors: true },
  })
  : {};

const hotMiddleware = devEnv
  ? webpackHotMiddleware(compiler)
  : {};

export {
  devMiddleware,
  hotMiddleware,
};
