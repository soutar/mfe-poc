const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const appsConfig = require("../../apps-config");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    publicPath: appsConfig.shellApp.publicPath,
  },
  devServer: {
    contentBase: "./dist",
    port: appsConfig.shellApp.devServerPort,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      // {
      //   test: /bootstrap\.tsx$/,
      //   loader: "bundle-loader",
      //   options: {
      //     lazy: true,
      //   },
      // },
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
      name: "shellApp",
      remotes: {
        "component-library":
          "componentLibrary@/apps/component-library/remoteEntry.js",
        "home-app": "homeApp@/apps/home-app/remoteEntry.js",
        "about-app": "aboutApp@/apps/about-app/remoteEntry.js",
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
