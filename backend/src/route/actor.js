const router = require("express").Router();

const { getListActor, getDetailActor } = require("../controllers/actor");

const initActorRouter = (app) => {
  router.get("/", getListActor);
  router.get('/detail-actor', getDetailActor)

  return app.use("/api/actor", router);
};

module.exports = initActorRouter;
