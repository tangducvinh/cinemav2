import express from "express";
import { Request, Response, Application } from "express";

import { getHomePage } from "../controllers/homeController";

let router = express.Router();

let initWebRouter = (app: Application) => {
  router.get("/home", getHomePage);

  router.get("/", (req: Request, res: Response) => {
    return res.send("hello");
  });

  return app.use("/api", router);
};

export default initWebRouter;
