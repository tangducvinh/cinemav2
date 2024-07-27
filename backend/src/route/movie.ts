import express from "express";
import { Application } from "express";

import { getListMovie } from "../controllers/movie";

const router = express.Router();

const initMovieRouter = (app: Application) => {
  router.get("/", getListMovie);

  return app.use("/api/movie", router);
};

export default initMovieRouter;
