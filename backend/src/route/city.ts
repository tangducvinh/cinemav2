import express from "express";
import { Application } from "express";

import { getListCity } from "../controllers/city";

const router = express.Router();

const initCityRouter = (app: Application) => {
  router.get("/", getListCity);

  return app.use("/api/city", router);
};

export default initCityRouter;
