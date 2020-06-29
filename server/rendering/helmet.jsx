/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

function appWrapp(props) {
  return <HelmetProvider context={helmetContext}>{props.children}</HelmetProvider>;
}

export { helmetContext, appWrapp };
