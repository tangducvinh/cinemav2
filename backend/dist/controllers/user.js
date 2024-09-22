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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = exports.changePassword = exports.getProfileInformation = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const jwt_1 = require("../middlewares/jwt");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, birthday, fullName, password, sex } = req.body;
    if (!email || !phone || !birthday || !fullName || !password || !sex)
        return res.json("missing input");
    const checkPhone = yield models_1.default.User.findOne({
        where: {
            phone,
        },
    });
    if (checkPhone)
        return res
            .status(400)
            .json({ success: false, message: "Số điện thoại đã tồn tại" });
    const checkEmail = yield models_1.default.User.findOne({
        where: {
            email,
        },
    });
    if (checkEmail)
        return res
            .status(400)
            .json({ success: false, message: "Email đã tồn tại" });
    const hashed = bcrypt_1.default.hashSync(password, 10);
    const response = yield models_1.default.User.create({
        email,
        phone,
        birthday,
        fullName,
        password: hashed,
        sex: sex === "0" ? false : true,
        role: "3",
    });
    return res.json({ success: true, message: "Đăng ký thành công" });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, phone } = req.body;
        const user = yield models_1.default.User.findOne({
            where: { [sequelize_1.Op.or]: { email: email || "", phone: phone || "" } },
        });
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "Tài khoản không tồn tại" });
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (validPassword) {
            // tao accessToken
            const accessToken = (0, jwt_1.generateAccessToken)(user.id, user.role);
            // tao refreshToken
            const refreshToken = (0, jwt_1.generateRefreshToken)(user.id, user.role);
            // gan refreshToken vao cookie
            res.cookie("refreshToken", refreshToken, { httpOnly: true });
            // res.cookie("name", user.fullName, { httpOnly: true });
            const _a = user.dataValues, { phone, password, role } = _a, newData = __rest(_a, ["phone", "password", "role"]);
            newData.accessToken = accessToken;
            return res.status(200).json({
                success: true,
                data: user ? newData : "no data",
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Tên đăng nhập hoặc mật khẩu không đúng",
            });
        }
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
});
exports.signIn = signIn;
const getProfileInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const user = yield models_1.default.User.findOne({
            where: {
                id,
            },
        });
        return res.status(200).json({
            success: user ? true : false,
            data: user || "no data",
            message: "pk",
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.getProfileInformation = getProfileInformation;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword } = req.body;
        const { id } = req.user;
        const user = yield models_1.default.User.findOne({
            where: {
                id,
            },
        });
        const checkPassword = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!checkPassword) {
            return res.status(200).json({
                success: false,
                message: "Mật khẩu hiện tại không chính xác",
            });
        }
        const hashed = bcrypt_1.default.hashSync(newPassword, 10);
        yield models_1.default.User.update({ password: hashed }, {
            where: {
                id,
            },
        });
        return res.status(200).json({
            success: user ? true : false,
            message: "Thay đổi mật khẩu thành công",
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
});
exports.changePassword = changePassword;
