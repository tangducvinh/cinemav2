import express from "express";
import { Application } from "express";

import {
  createOrder,
  deleteOrderAndOrderedSeat,
  deleteOrderedFood,
  orderFood,
} from "../controllers/order";

const router = express.Router();

const initOrderRouter = (app: Application) => {
  router.post("/create", createOrder);
  router.post("/order-food", orderFood);
  router.delete("/delete-order-and-ordered-seat", deleteOrderAndOrderedSeat);
  router.delete("/delete-ordered-food", deleteOrderedFood);

  return app.use("/api/order", router);
};

export default initOrderRouter;
