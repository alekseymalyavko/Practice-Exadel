const path = require('path');
const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const client = {
  entry: {
    app: './scripts/main.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "testTaker",
    libraryTarget: "var",
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'scripts'),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MinifyPlugin(),
  ],
};

module.exports = client;
