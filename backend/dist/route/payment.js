"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = require("../controllers/payment");
const router = express_1.default.Router();
const initPaymentRouter = (app) => {
    router.post("/vnp", payment_1.paymentVPN);
    router.get("/verify-vnp", payment_1.verifyVnp);
    return app.use("/api/payment", router);
};
exports.default = initPaymentRouter;
