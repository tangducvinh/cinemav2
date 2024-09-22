"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../controllers/homeController");
let router = express_1.default.Router();
let initWebRouter = (app) => {
    router.get("/home", homeController_1.getHomePage);
    router.get("/", (req, res) => {
        return res.send("hello");
    });
    return app.use("/api", router);
};
exports.default = initWebRouter;
