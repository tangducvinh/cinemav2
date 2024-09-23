const {
  getListShow,
  getDetailShow,
  getCinemaByMovieId,
  getDateFastBooking,
  getShowFastBooking,
} = require("../controllers/show");

const router = require("express").Router();

const initShowRouter = (app) => {
  router.get("/list-show", getListShow);
  router.get("/detail-show", getDetailShow);
  router.get("/list-cinema", getCinemaByMovieId);
  router.get("/date-fast-booking", getDateFastBooking);
  router.get("/show-fast-booking", getShowFastBooking);

  return app.use("/api/show", router);
};

module.exports = initShowRouter;
