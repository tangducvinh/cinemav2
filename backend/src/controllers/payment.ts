// const { VNPay, ignoreLogger } = require("vnpay");
// const db = require("../models");
import { Request, Response } from "express";

import db from "../models";
import vnpay from "../config/paymentVNP";
import { VerifyReturnUrl } from "vnpay";
import { deleteOrderedSeat } from "../services/order";

export const paymentVPN = async (req, res) => {
  const { amount, orderId } = req.body;

  // Lấy returnUrl từ frontend gửi lên, nếu không có thì sử dụng mặc định
  // const returnUrl = req.body?.returnUrl || "http://localhost:3000/vnpay-return";
  const returnUrl = `${process.env.URL_SERVER}/api/payment/verify-vnp`;

  // Tạo URL thanh toán
  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: amount,
    vnp_IpAddr:
      req.headers["x-forwarded-for"] ||
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
};

export const verifyVnp = async (req: any, res: Response) => {
  const { vnp_TxnRef } = req.query;
  let verify: VerifyReturnUrl;
  try {
    verify = vnpay.verifyReturnUrl(req.query);

    if (!verify.isVerified) {
      return res.redirect(`${process.env.URL_CLIENT}/booking-failed`);
      // return res.send("Xác thực tính toàn vẹn dữ liệu không thành công");
    }
    if (!verify.isSuccess) {
      // return res.send("Đơn hàng thanh toán không thành công");

      await deleteOrderedSeat(vnp_TxnRef);

      await db.OrderedFood.destroy({
        where: {
          orderId: vnp_TxnRef,
        },
      });

      await db.Order.destroy({
        where: {
          id: vnp_TxnRef,
        },
      });

      return res.redirect(`${process.env.URL_CLIENT}/booking-failed`);
    }
  } catch (e) {
    // return res.send("Dữ liệu không hợp lệ");
    return res.redirect(`${process.env.URL_CLIENT}/booking-failed`);
  }

  await db.OrderedSeat.update(
    { status: 1 },
    {
      where: { orderId: vnp_TxnRef },
    }
  );

  return res.send("Xác thực URL trả về thành công");
};
