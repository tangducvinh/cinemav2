import express from "express";
import { Application } from "express";

const router = express.Router();

import { getListFoods } from "../controllers/food";

const initFoodRouter = (app: Application) => {
  router.get("/list-food", getListFoods);

  return app.use("/api/food", router);
};

export default initFoodRouter;
