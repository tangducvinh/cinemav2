const {
  createOrder,
  deleteOrderAndOrderedSeat,
  deleteOrderedFood,
  orderFood,
} = require("../controllers/order");
const { verifyAccessToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

const initOrderRouter = (app) => {
  router.post("/create", verifyAccessToken, createOrder);
  router.post("/order-food", orderFood);
  router.delete("/delete-order-and-ordered-seat", deleteOrderAndOrderedSeat);
  router.delete("/delete-ordered-food", deleteOrderedFood);

  return app.use("/api/order", router);
};

module.exports = initOrderRouter;
