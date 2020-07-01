/* eslint-disable no-underscore-dangle */
import "core-js/stable";
import "regenerator-runtime/runtime";

import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";
import Loadable from "react-loadable";

import App from "./App";
import Store from "./store";
import rootReducer from "./reducers";
import { theme } from "./utils/styles/theme";
import { GlobalStyle } from "./utils/styles/global";
// import { AppProvider } from "./context";

function render(Root) {
  ReactDOM.hydrate(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Provider store={Store.store}>
          <PersistGate loading={null} persistor={Store.persistor}>
            {/* <AppProvider> */}
            <HelmetProvider>
              <CookiesProvider>
                <Root />
              </CookiesProvider>
            </HelmetProvider>
            {/* </AppProvider> */}
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </AppContainer>,
    document.getElementById("root")
  );
}

window.onload = () => {
  Loadable.preloadReady()
    .then(() => {
      render(App);

      if (module.hot) {
        module.hot.accept("./App.jsx", () => {
          render(App);
        });

        module.hot.accept("./reducers/index.js", () => {
          Store.store.replaceReducer(rootReducer);
        });
      }
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};
