const countryRouter = require("./country");
const directorRouter = require("./director");

const initRoutes = (app) => {
  app.use("/api/country", countryRouter);
  app.use("/api/director", directorRouter);
};

module.exports = initRoutes;
