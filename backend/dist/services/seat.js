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
exports.listOrderedSeat = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const listOrderedSeat = (showId) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const maxTime = new Date(now.getTime() - 7 * 60 * 1000);
    const response = yield models_1.default.OrderedSeat.findAll({
        where: {
            showId,
            [sequelize_1.Op.or]: [{ status: 1 }, { createdAt: { [sequelize_1.Op.gt]: new Date(maxTime) } }],
        },
        attributes: ["seatId"],
    });
    return response;
});
exports.listOrderedSeat = listOrderedSeat;
