import express from "express";
import { Application } from "express";

import seatController from "../controllers/seat";

const router = express.Router();

const initSeatRouter = (app: Application) => {
  router.get("/list-seat", seatController.getListSeat);

  return app.use("/api/seat", router);
};

export default initSeatRouter;
