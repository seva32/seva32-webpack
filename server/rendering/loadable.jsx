/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import Loadable from "react-loadable";

const modules = new Set();

function appWrapp(props) {
  return (
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
      {props.children}
    </Loadable.Capture>
  );
}

export { modules, appWrapp };
