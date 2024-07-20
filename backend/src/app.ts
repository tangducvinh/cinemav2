import express from "express";

import initWebRouter from "./route/web";

const app = express();
const port = 7000;

initWebRouter(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
