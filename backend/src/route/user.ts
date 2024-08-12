import express from "express";
import { Application } from "express";

import { signUp, signIn } from "../controllers/user";

const router = express.Router();

const initUserRouter = (app: Application) => {
  router.post("/sign-up", signUp);
  router.post("/sign-in", signIn);

  return app.use("/api/user", router);
};

export default initUserRouter;
