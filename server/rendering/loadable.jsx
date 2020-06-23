const React = require("react");
const Loadable = require("react-loadable");

let modules = [];

function appWrapp(props) {
  return (
    <Loadable.Capture
      report={(moduleName) => modules.push(moduleName)}
      {...props.children}
    />
  );
}

module.exports = { modules, appWrapp };
