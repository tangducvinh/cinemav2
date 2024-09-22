const { getHomePage } = require("../controllers/homeController");

const router = require("express").Router();

let initWebRouter = (app) => {
  router.get("/home", getHomePage);

  router.get("/", (req, res) => {
    return res.send("hello");
  });

  return app.use("/api", router);
};

module.exports = initWebRouter;
