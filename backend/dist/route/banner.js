"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { getListBanner } from "../controllers/banner";
const { getListBanner } = require("../controllers/banner");
const router = require("express").Router();
const initBannerRouter = (app) => {
    router.get("/", getListBanner);
    return app.use("/api/banner", router);
};
exports.default = initBannerRouter;
