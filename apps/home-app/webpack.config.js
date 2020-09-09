const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const appsConfig = require("../../apps-config");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    publicPath: appsConfig.homeApp.publicPath,
  },
  devServer: {
    contentBase: "./dist",
    port: appsConfig.homeApp.devServerPort,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
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
      name: "homeApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Home": "./src/Home",
      },
      remotes: {
        "component-library":
          "componentLibrary@/apps/component-library/remoteEntry.js",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
