const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(base, {
  mode: "production",
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'static/js/[name].[contenthash:8].js',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.join(__dirname, '../public')}
    ])
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});
