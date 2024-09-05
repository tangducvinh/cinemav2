import express from "express";
import { Application } from "express";

import { paymentVPN, verifyVnp } from "../controllers/payment";

const router = express.Router();

const initPaymentRouter = (app: Application) => {
  router.post("/vnp", paymentVPN);
  router.get("/verify-vnp", verifyVnp);

  return app.use("/api/payment", router);
};

export default initPaymentRouter;
