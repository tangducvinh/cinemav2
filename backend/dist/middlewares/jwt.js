"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (uid, role) => {
    return jsonwebtoken_1.default.sign({ id: uid, role }, process.env.SECRET_KEY_ACCESS_TOKEN, {
        expiresIn: "1d",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (uid, role) => {
    return jsonwebtoken_1.default.sign({ id: uid, role }, process.env.SECRET_KEY_REFRESH_TOKEN, {
        expiresIn: "365d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=jwt.js.map