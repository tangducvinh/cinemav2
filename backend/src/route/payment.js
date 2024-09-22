const { paymentVPN, verifyVnp } = require("../controllers/payment");

const router = require("express").Router();

const initPaymentRouter = (app) => {
  router.post("/vnp", paymentVPN);
  router.get("/verify-vnp", verifyVnp);

  return app.use("/api/payment", router);
};

module.exports = initPaymentRouter;
