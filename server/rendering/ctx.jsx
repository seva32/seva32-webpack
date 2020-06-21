/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// eslint-disable-next-line object-curly-newline
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const { AppProvider, useAppContext } = require("../../src/context/index");

module.exports = { AppProvider, useAppContext };
