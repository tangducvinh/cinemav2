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
exports.getDetailShow = exports.getListShow = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const getListShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, cinemaId, movieId, cityId } = req.query;
        const minTime = new Date(`${date} 00:00:00`);
        const maxTime = new Date(`${date} 23:59:59`);
        const response = yield models_1.default.Show.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { timeStart: { [sequelize_1.Op.gt]: minTime } },
                    { timeEnd: { [sequelize_1.Op.lt]: maxTime } },
                    { movieId },
                    cityId || "" !== "" ? { cityId } : {},
                    cinemaId || "" !== "" ? { cinemaId } : {},
                ],
            },
            order: [["cinemaId", "asc"]],
            attributes: {
            // exclude: ["cinemaId"],
            },
            include: [
                {
                    model: models_1.default.Cinema,
                    as: "cinema",
                    attributes: ["name"],
                },
                {
                    model: models_1.default.Movie,
                    as: "movie",
                    attributes: ["slug"],
                },
            ],
        });
        return res.status(200).json({
            success: response ? true : false,
            message: response ? "Thành công" : "Thất bại",
            data: response ? response : "no data",
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.getListShow = getListShow;
const getDetailShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { showId } = req.query;
        const response = yield models_1.default.Show.findOne({
            where: {
                id: showId,
            },
            include: [
                {
                    model: models_1.default.Movie,
                    as: "movie",
                    attributes: ["name", "poster"],
                },
                {
                    model: models_1.default.Cinema,
                    as: "cinema",
                    attributes: ["name"],
                },
                {
                    model: models_1.default.Room,
                    as: "room",
                    attributes: ["name", "width", "height"],
                },
            ],
            attributes: {
                exclude: ["createAt", "updateAt"],
            },
        });
        return res.status(200).json({
            success: response ? true : false,
            message: response ? "Thành công" : "Thất bại",
            data: response ? response : "no data",
        });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.getDetailShow = getDetailShow;
