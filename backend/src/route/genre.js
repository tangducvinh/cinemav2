const { getListGenres } = require("../controllers/genre");
const router = require("express").Router();

const initGenreRouter = (app) => {
  router.get("/", getListGenres);

  return app.use("/api/genre", router);
};

module.exports = initGenreRouter;
