const { getListCity } = require("../controllers/city");
const router = require("express").Router();

const initCityRouter = (app) => {
  router.get("/", getListCity);

  return app.use("/api/city", router);
};

module.exports = initCityRouter;
