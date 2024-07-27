import express from "express";
import cors from "cors";

import initWebRouter from "./route/web";
import initBannerRouter from "./route/banner";
import initMovieRouter from "./route/movie";
import connectDB from "./config/connectDB";

const app = express();
const port = process.env.PORT || 7000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);

// initWebRouter(app);
initBannerRouter(app);
initMovieRouter(app);

connectDB();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
