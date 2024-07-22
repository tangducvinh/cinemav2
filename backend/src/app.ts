import express from "express";

import initWebRouter from "./route/web";
import initBannerRouter from "./route/banner";
import connectDB from "./config/connectDB";

const app = express();
const port = process.env.PORT || 7000;

initWebRouter(app);
initBannerRouter(app);

connectDB();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
