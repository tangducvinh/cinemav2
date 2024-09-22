"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seat_1 = require("../controllers/seat");
const router = express_1.default.Router();
const initSeatRouter = (app) => {
    router.get("/list-seat", seat_1.getListSeat);
    router.get("/list-ordered-seat", seat_1.getListOrderedSeat);
    router.get("/create-auto-seats", seat_1.createAutoSeats);
    return app.use("/api/seat", router);
};
exports.default = initSeatRouter;
//# sourceMappingURL=seat.js.map