const React = require("react");
const Loadable = require("react-loadable");

let modules = new Set();

function appWrapp(props) {
  return (
    <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
      {props.children}
    </Loadable.Capture>
  );
}

module.exports = { modules, appWrapp };
