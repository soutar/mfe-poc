const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const appsConfig = require("../../apps-config");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    publicPath: appsConfig.componentLibrary.publicPath,
  },
  devServer: {
    contentBase: "./dist",
    port: appsConfig.componentLibrary.devServerPort,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "componentLibrary",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
      },
    }),
  ],
};
