// import express from "express";
const express = require("express");
// import cors from "cors";
const cors = require("cors");
// import cookieParser from "cookie-parser";
const cookieParser = require("cookie-parser");

// import initBannerRouter from "./route/banner";
// const initBannerRouter = require("./route/banner");
const initBannerRouter = require("./src/route/banner");
// import initMovieRouter from "./route/movie";
// const initMovieRouter = require("./route/movie");
// import initUserRouter from "./route/user";
// const initUserRouter =  require('./route/user')
// import initShowRouter from "./route/show";
// import initCityRouter from "./route/city";
// import initCinemaRouter from "./route/cinema";
// import initSeatRouter from "./route/seat";
// import initFoodRouter from "./route/food";
// import initPaymentRouter from "./route/payment";
// import initOrderRouter from "./route/order";
// import connectDB from "./config/connectDB";
// const connectDB = require("./config/connectDB");
const connectDB = require("./src/config/connectDB");

const app = express();
const port = process.env.PORT || 7777;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initWebRouter(app);
initBannerRouter(app);
// initMovieRouter(app);
// initUserRouter(app);
// initShowRouter(app);
// initCityRouter(app);
// initCinemaRouter(app);
// initSeatRouter(app);
// initFoodRouter(app);
// initPaymentRouter(app);
// initOrderRouter(app);

app.use((req, res) => res.json("server on"));

connectDB();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
