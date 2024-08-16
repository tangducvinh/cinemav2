import express from "express";
import { Application } from "express";

import { getListDate, getListShow } from "../controllers/show";

const router = express.Router();

const initShowRouter = (app: Application) => {
  router.get("/list-show", getListShow);
  router.get("/list-date", getListDate);

  return app.use("/api/show", router);
};

export default initShowRouter;
