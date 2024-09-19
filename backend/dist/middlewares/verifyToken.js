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
exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    if (token) {
        const accessToken = token === null || token === void 0 ? void 0 : token.split(" ")[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.SECRET_KEY_ACCESS_TOKEN, (err, decode) => {
            if (err) {
                return res.status(403).json("Token is valid");
            }
            req.user = decode;
            next();
        });
    }
    else {
        return res.status(401).json("Bạn chưa đăng nhập");
    }
});
exports.verifyAccessToken = verifyAccessToken;
//# sourceMappingURL=verifyToken.js.map