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
exports.createAutoSeats = exports.getListOrderedSeat = exports.getListSeat = void 0;
const models_1 = __importDefault(require("../models"));
const seat_1 = require("../services/seat");
const getListSeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.query;
        const response = yield models_1.default.Seat.findAll({
            where: {
                roomId,
            },
            order: [
                ["row", "asc"],
                ["column", "asc"],
            ],
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
exports.getListSeat = getListSeat;
const getListOrderedSeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { showId } = req.query;
        const response = yield (0, seat_1.listOrderedSeat)(showId);
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
exports.getListOrderedSeat = getListOrderedSeat;
const createAutoSeats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //status: 1 normal
    // status: 2 broken
    try {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 29; j++) {
                if (j === 4 || j === 5 || j === 23 || j === 24) {
                    yield models_1.default.Seat.create({
                        name: 0,
                        roomId: 1,
                        number: 0,
                        row: i,
                        column: j,
                        status: 2,
                        ticketPrice: 0,
                    });
                }
                else if (j <= 3) {
                    yield models_1.default.Seat.create({
                        name: j + 1,
                        roomId: 1,
                        number: j + 1,
                        row: i,
                        column: j,
                        status: 1,
                        ticketPrice: 70000,
                    });
                }
                else if (j <= 22) {
                    yield models_1.default.Seat.create({
                        name: j + 1 - 2,
                        roomId: 1,
                        number: j + 1 - 2,
                        row: i,
                        column: j,
                        status: 1,
                        ticketPrice: 70000,
                    });
                }
                else {
                    yield models_1.default.Seat.create({
                        name: j + 1 - 4,
                        roomId: 1,
                        number: j + 1 - 4,
                        row: i,
                        column: j,
                        status: 1,
                        ticketPrice: 70000,
                    });
                }
            }
        }
        // for (let i = 34000; i < 35000; i++) {
        //   await db.Seat.destroy({ where: { id: i } });
        // }
        return res.status(200).json("ok");
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.createAutoSeats = createAutoSeats;
