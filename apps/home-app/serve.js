const appsConfig = require("../../apps-config");
const express = require("express");
const app = express();
app.use(appsConfig.homeApp.publicPath, express.static("dist"));
app.listen(appsConfig.homeApp.devServerPort, () => {
  console.log(`about-app listening on :${appsConfig.homeApp.devServerPort}`);
});
