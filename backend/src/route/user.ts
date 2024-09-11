import express from "express";
import { Application } from "express";

import {
  signUp,
  signIn,
  getProfileInformation,
  changePassword,
} from "../controllers/user";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();

const initUserRouter = (app: Application) => {
  router.post("/sign-up", signUp);
  router.post("/sign-in", signIn);
  router.get("/profile", verifyAccessToken, getProfileInformation);
  router.put("/change-password", verifyAccessToken, changePassword);

  return app.use("/api/user", router);
};

export default initUserRouter;
