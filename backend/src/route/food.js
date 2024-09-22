const router = require("express").Router();

const { getListFoods } = require("../controllers/food");

const initFoodRouter = (app) => {
  router.get("/list-food", getListFoods);

  return app.use("/api/food", router);
};

module.exports = initFoodRouter;
