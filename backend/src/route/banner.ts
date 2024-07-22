import express from "express";
import { Application } from "express";

import { getListBanner } from "../controllers/banner";

const router = express.Router();

const initBannerRouter = (app: Application) => {
  router.get("/", getListBanner);

  return app.use("/api/banner", router);
};

export default initBannerRouter;
