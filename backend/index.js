const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const initRoutes = require("./src/route");

const initBannerRouter = require("./src/route/banner");
const initActorRouter = require("./src/route/actor");
const initMovieRouter = require("./src/route/movie");
const initUserRouter = require("./src/route/user");
const initShowRouter = require("./src/route/show");
const initCityRouter = require("./src/route/city");
const initCinemaRouter = require("./src/route/cinema");
const initSeatRouter = require("./src/route/seat");
const initFoodRouter = require("./src/route/food");
const initPaymentRouter = require("./src/route/payment");
const initOrderRouter = require("./src/route/order");
const initGenreRouter = require("./src/route/genre");
const connectDB = require("./src/config/connectDB");

const app = express();
const port = process.env.PORT || 7777;
connectDB();

app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initBannerRouter(app);
initMovieRouter(app);
initUserRouter(app);
initShowRouter(app);
initCityRouter(app);
initCinemaRouter(app);
initSeatRouter(app);
initFoodRouter(app);
initPaymentRouter(app);
initOrderRouter(app);
initGenreRouter(app);
initActorRouter(app);
initRoutes(app);

app.use("/", (req, res) => res.json("server on"));

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
