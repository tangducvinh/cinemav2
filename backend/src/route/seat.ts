import express from "express";
import { Application } from "express";

import { getListOrderedSeat, getListSeat } from "../controllers/seat";

const router = express.Router();

const initSeatRouter = (app: Application) => {
  router.get("/list-seat", getListSeat);
  router.get("/list-ordered-seat", getListOrderedSeat);

  return app.use("/api/seat", router);
};

export default initSeatRouter;
