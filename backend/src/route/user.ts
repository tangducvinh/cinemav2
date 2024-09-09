import express from "express";
import { Application } from "express";

import { signUp, signIn, getProfileInformation } from "../controllers/user";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();

const initUserRouter = (app: Application) => {
  router.post("/sign-up", signUp);
  router.post("/sign-in", signIn);
  router.get("/profile", verifyAccessToken, getProfileInformation);

  return app.use("/api/user", router);
};

export default initUserRouter;
