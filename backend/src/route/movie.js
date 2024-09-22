const { getListMovie, getDetailMovie } = require("../controllers/movie");

const router = require("express").Router();

const initMovieRouter = (app) => {
  router.get("/", getListMovie);
  router.get("/detail-movie", getDetailMovie);

  return app.use("/api/movie", router);
};

module.exports = initMovieRouter;
