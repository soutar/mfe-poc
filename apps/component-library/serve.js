const appsConfig = require("../../apps-config");
const express = require("express");
const app = express();
app.use(appsConfig.componentLibrary.publicPath, express.static("dist"));
app.listen(appsConfig.componentLibrary.devServerPort, () => {
  console.log(
    `about-app listening on :${appsConfig.componentLibrary.devServerPort}`
  );
});
