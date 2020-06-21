/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
const React = require("react");
const { HelmetProvider } = require("react-helmet-async");

const helmetContext = {};

function appWrapp(props) {
  return <HelmetProvider context={helmetContext} {...props.children} />;
}

module.exports = { helmetContext, appWrapp };
