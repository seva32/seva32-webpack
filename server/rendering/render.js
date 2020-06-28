/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import serialize from "serialize-javascript";
import { getBundles } from "react-loadable-ssr-addon";
import { devMiddleware } from "../middleware/webpack";
import { appWrapp as HelmetProvider, helmetContext } from "./helmet.jsx";
import { appWrapp as LoadableCapture, modules } from "./loadable.jsx";
import manifest from "../../build/react-loadable-ssr-addon.json";

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

  // eslint-disable-next-line no-unused-vars
  const { default: App } = require("../../build/app.server");
  const { default: rootReducer } = require("../../build/rootReducer.server");

  if (process.env.NODE_ENV !== "production") {
    delete require.cache[require.resolve("../../build/app.server")];
    delete require.cache[require.resolve("../../build/rootReducer.server")];
  }

  const store = createStore(rootReducer, preloadedState);

  const template = getTemplate();

  // const algo = ReactDOMServer.renderToString(React.createElement(App));

  // console.log(
  //   "###########",
  //   algo
  // );

  const body = ReactDOMServer.renderToString(
    React.createElement(
      LoadableCapture,
      {},
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
              React.createElement(<div>Hola</div>)
            )
          )
        )
      )
    )
  );

  const { helmet } = helmetContext;

  const finalState = store.getState();

  const bundles = getBundles(manifest, [
    ...manifest.entrypoints,
    ...Array.from(modules),
  ]);

  const styles = bundles.css || [];
  const scripts = bundles.js || [];

  // const stylesTags = styles.map(style => {
  //         return `<link href="../${style.file}" rel="stylesheet" />`;
  //       }).join('\n');

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
    )
    .replace(
      "</head>",
      `${styles
        .map((style) => `<link href="/${style.file}" rel="stylesheet" />`)
        .join("\n")}</head>`
    )
    .replace(
      "</body>",
      `${scripts
        .map(
          (script) => `<script type="text/babel" src="/${script.file}"></script>`
        )
        .join("\n")}</body>`
    );

  if (context.url) {
    res.redirect(context.status, context.url);
  } else {
    res.status(context.status || 200).send(html);
  }
}

export default render;
