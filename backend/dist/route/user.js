"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
const initUserRouter = (app) => {
    router.post("/sign-up", user_1.signUp);
    router.post("/sign-in", user_1.signIn);
    router.get("/profile", verifyToken_1.verifyAccessToken, user_1.getProfileInformation);
    router.put("/change-password", verifyToken_1.verifyAccessToken, user_1.changePassword);
    return app.use("/api/user", router);
};
exports.default = initUserRouter;
