"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const show_1 = require("../controllers/show");
const router = express_1.default.Router();
const initShowRouter = (app) => {
    router.get("/list-show", show_1.getListShow);
    router.get("/detail-show", show_1.getDetailShow);
    return app.use("/api/show", router);
};
exports.default = initShowRouter;
