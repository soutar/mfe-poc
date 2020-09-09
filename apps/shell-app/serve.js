const appsConfig = require("../../apps-config");
const express = require("express");
const app = express();
app.use(appsConfig.shellApp.publicPath, express.static("dist"));
app.use((req, res, next) => {
  req.url = "/"; // gross hacky 11pm Sunday night way of sending the index.html for 404s
  express.static("dist")(req, res, next);
});
app.listen(appsConfig.shellApp.devServerPort, () => {
  console.log(`about-app listening on :${appsConfig.shellApp.devServerPort}`);
});
