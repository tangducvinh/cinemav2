"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteOrderedFood = exports.deleteOrderAndOrderedSeat = exports.orderFood = exports.createOrder = void 0;
const models_1 = __importDefault(require("../models"));
const seat_1 = require("../services/seat");
const services = __importStar(require("../services"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { showId, listSeats } = req.body;
    const { id } = req.user;
    try {
        const orderedSeats = yield (0, seat_1.listOrderedSeat)(showId);
        // check seat ordered yet
        let check = false;
        yield listSeats.forEach((item) => {
            if (orderedSeats.some((orderedSeat) => orderedSeat.dataValues.seatId === item.seatId)) {
                check = true;
            }
        });
        if (check) {
            return res.status(200).json({
                success: false,
                message: "Ghế đã được đặt",
            });
        }
        const response = yield models_1.default.Order.create({
            userId: id,
            showId,
            orderedSeats: listSeats,
        }, {
            include: [
                {
                    model: models_1.default.OrderedSeat,
                    as: "orderedSeats",
                },
            ],
        });
        console.log(response);
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
exports.createOrder = createOrder;
const orderFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listFoods } = req.body;
    try {
        const response = yield models_1.default.OrderedFood.bulkCreate(listFoods);
        return res.status(200).json({
            success: response ? true : false,
            message: response ? "Thành công" : "Thất bại",
            data: response ? response : "no data",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
});
exports.orderFood = orderFood;
const deleteOrderAndOrderedSeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.query;
    try {
        yield services.deleteOrderedSeat(orderId);
        yield services.deleteOrder(orderId);
        return res.status(200).json({
            success: true,
            message: "Đã xoá đơn đặt và ghế đã đặt thành công",
        });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.deleteOrderAndOrderedSeat = deleteOrderAndOrderedSeat;
const deleteOrderedFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.query;
    try {
        yield services.deleteOrderedFood(orderId);
        return res.status(200).json({
            success: true,
            message: "Đã xoá đơn đặt đồ uống thành công",
        });
    }
    catch (e) {
        return res.status(500).json(e);
    }
});
exports.deleteOrderedFood = deleteOrderedFood;
