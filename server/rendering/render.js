const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require("path");
require("@babel/register");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { StaticRouter } = require("react-router-dom");
const { createStore } = require("redux");
const { Provider } = require("react-redux");
const { CookiesProvider } = require("react-cookie");
const serialize = require("serialize-javascript");
const { devMiddleware } = require("../middleware/webpack");
const { appWrapp: HelmetProvider, helmetContext } = require("./helmet.jsx");

function getTemplate() {
  if (process.env.NODE_ENV === "production") {
    return fs.readFileSync(path.resolve("build/index.html"), "utf8");
  }

  return devMiddleware.fileSystem.readFileSync(
    path.resolve("build/index.html"),
    "utf8"
  );
}

function render(req, res, preloadedState, routeData) {
  const context = { data: routeData };

  const { default: App } = require("../../build/app.server");
  const { default: rootReducer } = require("../../build/rootReducer.server");

  if (process.env.NODE_ENV !== "production") {
    delete require.cache[require.resolve("../../build/app.server")];
    delete require.cache[require.resolve("../../build/rootReducer.server")];
  }

  const store = createStore(rootReducer, preloadedState);

  const template = getTemplate();

  const body = ReactDOMServer.renderToString(
    React.createElement(
      HelmetProvider,
      {},
      React.createElement(
        Provider,
        { store },
        React.createElement(
          CookiesProvider,
          { cookies: req.universalCookies },
          React.createElement(
            StaticRouter,
            { location: req.url, context },
            React.createElement(App)
          )
        )
      )
    )
  );

  const { helmet } = helmetContext;

  const finalState = store.getState();

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replace("</head>", `${helmet.link.toString()}</head>`)
    .replace("</head>", `${helmet.title.toString()}</head>`)
    .replace(
      "</head>",
      `<script>window.__PRELOADED_STATE__=${serialize(
        finalState
      )};</script><script>window.__ROUTE_DATA__=${serialize(
        routeData
      )};</script></head>`
    );

  if (context.url) {
    res.redirect(context.status, context.url);
  } else {
    res.status(context.status || 200).send(html);
  }
}

module.exports = render;
