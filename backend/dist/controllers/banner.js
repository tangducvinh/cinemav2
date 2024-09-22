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
exports.getListBanner = void 0;
// import db from "../models";
const models_1 = __importDefault(require("../models"));
const getListBanner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield models_1.default.Banner.findAll();
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
exports.getListBanner = getListBanner;
