import express from "express";
import { Application } from "express";

import { getListMovie, getDetailMovie } from "../controllers/movie";

const router = express.Router();

const initMovieRouter = (app: Application) => {
  router.get("/", getListMovie);
  router.get("/detail-movie", getDetailMovie);

  return app.use("/api/movie", router);
};

export default initMovieRouter;
