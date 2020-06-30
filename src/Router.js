/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter, StaticRouter } from "react-router-dom";

export default function Router(props) {
  const { ssrLocation, children, context } = props;

  if (ssrLocation == null) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return <StaticRouter location={ssrLocation} context={context}>{children}</StaticRouter>;
}
