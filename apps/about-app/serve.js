const appsConfig = require("../../apps-config");
const express = require("express");
const app = express();
app.use(appsConfig.aboutApp.publicPath, express.static("dist"));
app.listen(appsConfig.aboutApp.devServerPort, () => {
  console.log(`about-app listening on :${appsConfig.aboutApp.devServerPort}`);
});
