// require("@babel/register")({
//   presets: [
//     [
//       "@babel/preset-env",
//       {
//         targets: {
//           node: "current",
//         },
//       },
//     ],
//   ],
// });
// require("./server.js");

require("@babel/register")({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    [
      "css-modules-transform",
      {
        camelCase: true,
        extensions: [".css", ".scss"],
      },
    ],
    "dynamic-import-node",
  ],
});
require("@babel/polyfill");
global.Promise = require("bluebird");

require.extensions[".svg"] = () => {};

require("./server.js");
