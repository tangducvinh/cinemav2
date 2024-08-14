import express from "express";
import { Application } from "express";

import { getListShow } from "../controllers/show";

const router = express.Router();

const initShowRouter = (app: Application) => {
  router.get("/list-show", getListShow);

  return app.use("/api/show", router);
};

export default initShowRouter;
