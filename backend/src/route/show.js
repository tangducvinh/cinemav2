const { getListShow, getDetailShow } = require("../controllers/show");

const router = require("express").Router();

const initShowRouter = (app) => {
  router.get("/list-show", getListShow);
  router.get("/detail-show", getDetailShow);

  return app.use("/api/show", router);
};

module.exports = initShowRouter;
