const express = require("express");
const httpProxy = require("http-proxy");
const appsConfig = require("./apps-config");

const server = express();
const proxy = httpProxy.createProxyServer();
const port = process.env.port || 4000;

for (const app in appsConfig) {
  const config = appsConfig[app];
  const route = `${config.publicPath}*`;
  const target = `http://localhost:${config.devServerPort}`;
  console.log(`Routing requests on ${route} to ${target}`);
  server.get(route, (req, res, next) => {
    console.log(app, req.path);
    proxy.web(
      req,
      res,
      {
        target: `http://localhost:${config.devServerPort}`,
      },
      next
    );
  });
}

server.listen(port, (err) => {
  console.log(`Listening on :${port}`);
});
