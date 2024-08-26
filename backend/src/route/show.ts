import express from "express";
import { Application } from "express";

import { getListShow, getDetailShow } from "../controllers/show";

const router = express.Router();

const initShowRouter = (app: Application) => {
  router.get("/list-show", getListShow);
  router.get("/detail-show", getDetailShow);

  return app.use("/api/show", router);
};

export default initShowRouter;
