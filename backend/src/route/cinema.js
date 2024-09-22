const { cinemaController } = require("../controllers/cinema");

const router = require("express").Router();

const initCinemaRouter = (app) => {
  router.get("/", cinemaController.getListCinema);

  return app.use("/api/cinema", router);
};

module.exports = initCinemaRouter;
