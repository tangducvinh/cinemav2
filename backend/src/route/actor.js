const router = require("express").Router();

const { getListActor } = require("../controllers/actor");

const initActorRouter = (app) => {
  router.get("/", getListActor);

  return app.use("/api/actor", router);
};

module.exports = initActorRouter;
