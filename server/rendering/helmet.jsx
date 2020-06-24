/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
const React = require("react");
const { HelmetProvider } = require("react-helmet-async");

const helmetContext = {};

function appWrapp() {
  return <HelmetProvider context={helmetContext} />;
}

module.exports = { helmetContext, appWrapp };
