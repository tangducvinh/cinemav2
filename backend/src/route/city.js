"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const city_1 = require("../controllers/city");
const router = express_1.default.Router();
const initCityRouter = (app) => {
    router.get("/", city_1.getListCity);
    return app.use("/api/city", router);
};
exports.default = initCityRouter;
//# sourceMappingURL=city.js.map