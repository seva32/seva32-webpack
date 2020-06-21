/* eslint-disable no-underscore-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import logger from "redux-logger";
import merge from "deepmerge";
import reducers from "../reducers";

const configureStore = (initialState) => {
  // token from current session
  const token = localStorage.getItem("token") || "";
  // state from ssr
  const preloadedState = window.__PRELOADED_STATE__ || {};
  delete window.__PRELOADED_STATE__;

  const buffer = merge(preloadedState, {
    auth: { authenticated: token, errorMessage: "" },
  });

  initialState = merge(initialState, buffer);

  const enhancer = compose(applyMiddleware(reduxPromise, reduxThunk, logger));
  return createStore(reducers, initialState, enhancer);
};
const store = configureStore({});
export default store;
