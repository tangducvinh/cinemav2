"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const banner_1 = require("../controllers/banner");
const router = express_1.default.Router();
const initBannerRouter = (app) => {
    router.get("/", banner_1.getListBanner);
    return app.use("/api/banner", router);
};
exports.default = initBannerRouter;
//# sourceMappingURL=banner.js.map