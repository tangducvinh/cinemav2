"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailMovie = exports.getListMovie = void 0;
const models_1 = __importDefault(require("../models"));
const { QueryTypes } = require("sequelize");
const getListMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.query;
    try {
        let response;
        if (status) {
            response = yield models_1.default.Movie.findAll({
                where: {
                    status,
                },
            });
        }
        else {
            response = yield models_1.default.Movie.findAll();
        }
        return res.json({
            success: response ? true : false,
            message: response ? "Thành công" : "Thất bại",
            data: response ? response : "no data",
        });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.getListMovie = getListMovie;
const getDetailMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.query;
        const movie = yield models_1.default.Movie.findOne({
            where: {
                slug,
            },
            include: [
                {
                    model: models_1.default.Genre,
                    as: "genres",
                    attributes: ["id", "name", "slug"],
                },
                {
                    model: models_1.default.Actor,
                    as: "actors",
                    attributes: ["id", "name", "slug"],
                },
                {
                    model: models_1.default.Director,
                    as: "directors",
                    attributes: ["id", "name", "slug"],
                },
            ],
        });
        return res.json(movie);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
});
exports.getDetailMovie = getDetailMovie;
