// import { getListBanner } from "../controllers/banner";
const { getListBanner } = require("../controllers/banner");

const router = require("express").Router();

const initBannerRouter = (app) => {
  router.get("/", getListBanner);

  return app.use("/api/banner", router);
};

module.exports = initBannerRouter;
