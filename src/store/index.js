/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import logger from "redux-logger";
import merge from "deepmerge";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const configureStore = (initialState) => {
  // token from current session
  const token = localStorage.getItem("token") || "";
  // state from ssr
  let preloadedState;
  if (typeof window !== "undefined") {
    preloadedState = window.__PRELOADED_STATE__ || {};
    delete window.__PRELOADED_STATE__;
  } else {
    preloadedState = {};
  }

  const buffer = merge(preloadedState, {
    auth: { authenticated: token, errorMessage: "" },
  });

  initialState = merge(initialState, buffer);

  const enhancer = compose(applyMiddleware(reduxPromise, reduxThunk, logger));
  return createStore(persistedReducer, initialState, enhancer);
};
const store = configureStore({});
const persistor = persistStore(store);
export default { store, persistor };
