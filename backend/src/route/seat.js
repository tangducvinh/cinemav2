const {
  createAutoSeats,
  getListOrderedSeat,
  getListSeat,
} = require("../controllers/seat");

const router = require("express").Router();

const initSeatRouter = (app) => {
  router.get("/list-seat", getListSeat);
  router.get("/list-ordered-seat", getListOrderedSeat);
  router.get("/create-auto-seats", createAutoSeats);

  return app.use("/api/seat", router);
};

module.exports = initSeatRouter;
