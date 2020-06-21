/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require("postcss-import")(),
    require("postcss-url")(),
    require("postcss-preset-env")({
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    }),
    require("cssnano")({
      preset: "default",
    }),
    require("postcss-nested")(),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")(),
  ],
};
