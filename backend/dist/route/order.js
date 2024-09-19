"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
const initOrderRouter = (app) => {
    router.post("/create", verifyToken_1.verifyAccessToken, order_1.createOrder);
    router.post("/order-food", order_1.orderFood);
    router.delete("/delete-order-and-ordered-seat", order_1.deleteOrderAndOrderedSeat);
    router.delete("/delete-ordered-food", order_1.deleteOrderedFood);
    return app.use("/api/order", router);
};
exports.default = initOrderRouter;
//# sourceMappingURL=order.js.map