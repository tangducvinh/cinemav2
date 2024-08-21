import express from "express";
import { Application } from "express";

import cinemaController from "../controllers/cinema";

const router = express.Router();

const initCinemaRouter = (app: Application) => {
  router.get("/", cinemaController.getListCinema);

  return app.use("/api/cinema", router);
};

export default initCinemaRouter;
