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
exports.verifyVnp = exports.paymentVPN = void 0;
const models_1 = __importDefault(require("../models"));
const paymentVNP_1 = __importDefault(require("../config/paymentVNP"));
const order_1 = require("../services/order");
const paymentVPN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, orderId } = req.body;
    // Lấy returnUrl từ frontend gửi lên, nếu không có thì sử dụng mặc định
    // const returnUrl = req.body?.returnUrl || "http://localhost:3000/vnpay-return";
    const returnUrl = `${process.env.URL_SERVER}/api/payment/verify-vnp`;
    // Tạo URL thanh toán
    const paymentUrl = paymentVNP_1.default.buildPaymentUrl({
        vnp_Amount: amount,
        vnp_IpAddr: req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.ip,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: "Thanh toán đặt vé",
        // vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: returnUrl, // Đường dẫn nên là của frontend
        // vnp_Locale: VnpLocale.VN,
    });
    // return res.json({ paymentUrl, order });
    return res.status(200).json({
        success: true,
        data: { paymentUrl },
    });
});
exports.paymentVPN = paymentVPN;
const verifyVnp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vnp_TxnRef } = req.query;
    let verify;
    try {
        verify = paymentVNP_1.default.verifyReturnUrl(req.query);
        if (!verify.isVerified) {
            return res.redirect(`${process.env.URL_CLIENT}/booking-failed`);
            // return res.send("Xác thực tính toàn vẹn dữ liệu không thành công");
        }
        if (!verify.isSuccess) {
            // return res.send("Đơn hàng thanh toán không thành công");
            yield (0, order_1.deleteOrderedSeat)(vnp_TxnRef);
            yield models_1.default.OrderedFood.destroy({
                where: {
                    orderId: vnp_TxnRef,
                },
            });
            yield models_1.default.Order.destroy({
                where: {
                    id: vnp_TxnRef,
                },
            });
            return res.redirect(`${process.env.URL_CLIENT}/booking-failed`);
        }
    }
    catch (e) {
        // return res.send("Dữ liệu không hợp lệ");
        return res.redirect(`${process.env.URL_CLIENT}/booking-failed`);
    }
    yield models_1.default.OrderedSeat.update({ status: 1 }, {
        where: { orderId: vnp_TxnRef },
    });
    return res.send("Xác thực URL trả về thành công");
});
exports.verifyVnp = verifyVnp;
