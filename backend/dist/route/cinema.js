"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cinema_1 = __importDefault(require("../controllers/cinema"));
const router = express_1.default.Router();
const initCinemaRouter = (app) => {
    router.get("/", cinema_1.default.getListCinema);
    return app.use("/api/cinema", router);
};
exports.default = initCinemaRouter;
