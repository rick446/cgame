module.exports = function (api) {
  api.cache(true);

  return {
    "presets": [
      ["@babel/env", {
        "targets": {
          "browsers": [
            ">0.25%",
            "not ie 11",
            "not op_mini all"
          ]
        },
        "modules": false
      }]
    ],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
    ]
  }
}
