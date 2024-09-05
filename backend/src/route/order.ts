import express from "express";
import { Application } from "express";

import { createOrder, orderFood } from "../controllers/order";

const router = express.Router();

const initOrderRouter = (app: Application) => {
  router.post("/create", createOrder);
  router.post("/order-food", orderFood);

  return app.use("/api/order", router);
};

export default initOrderRouter;
