import express from "express";
import { Application } from "express";

import { paymentVPN } from "../controllers/payment";

const router = express.Router();

const initPaymentRouter = (app: Application) => {
  router.post("/vnp", paymentVPN);

  return app.use("/api/payment", router);
};

export default initPaymentRouter;
