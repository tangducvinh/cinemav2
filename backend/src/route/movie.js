"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_1 = require("../controllers/movie");
const router = express_1.default.Router();
const initMovieRouter = (app) => {
    router.get("/", movie_1.getListMovie);
    router.get("/detail-movie", movie_1.getDetailMovie);
    return app.use("/api/movie", router);
};
exports.default = initMovieRouter;
//# sourceMappingURL=movie.js.map