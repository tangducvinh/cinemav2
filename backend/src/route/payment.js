const { paymentVPN, verifyVnp } = require("../controllers/payment");

const { verifyAccessToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

const initPaymentRouter = (app) => {
  router.post("/vnp", verifyAccessToken, paymentVPN);
  router.get("/verify-vnp", verifyVnp);

  return app.use("/api/payment", router);
};

module.exports = initPaymentRouter;
