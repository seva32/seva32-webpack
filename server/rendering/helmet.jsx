/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

function appWrapp() {
  return <HelmetProvider context={helmetContext} />;
}

export { helmetContext, appWrapp };
