import { Application } from "express";

// import { getListBanner } from "../controllers/banner";
const { getListBanner } = require("../controllers/banner");

const router = require("express").Router();

const initBannerRouter = (app:Application) => {
  router.get("/", getListBanner);

  return app.use("/api/banner", router);
};

export default initBannerRouter;
