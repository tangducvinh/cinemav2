const { VNPay, ignoreLogger } = require("vnpay");
const db = require("../models");

const vnpay = new VNPay({
  tmnCode: "PLQOL2A6",
  secureSecret: "K6A4O80Y20FHOCTCIHBM290NXBIPESSM",
  vnpayHost: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
  // hashAlgorithm: hasdcode, // tùy chọn

  /**
   * Sử dụng enableLog để bật/tắt logger
   * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
   */
  enableLog: true, // optional

  /**
   * Hàm `loggerFn` sẽ được gọi để ghi log
   * Mặc định, loggerFn sẽ ghi log ra console
   * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
   *
   * `ignoreLogger` là một hàm không làm gì cả
   */
  loggerFn: ignoreLogger, // optional
});

// const OrderedFood = db.Order.hasMany(db.OrderedFood, { as: "orderedFoods" });
// const OrderedSeat = db.Order.hasMany(db.OrderedSeat, { as: "orderedSeats" });

const paymentVPN = async (req, res) => {
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

const verifyVnp = async (req, res) => {
  const { vnp_TxnRef } = req.query;

  try {
    const verify = vnpay.verifyReturnUrl(req.query);

    console.log(vnp_TxnRef);

    if (!verify.isVerified) {
      return res.redirect(`${process.env.URL_CLIENT}/dat-ve-that-bai`);
      // return res.send("Xác thực tính toàn vẹn dữ liệu không thành công");
    }
    if (!verify.isSuccess) {
      // return res.send("Đơn hàng thanh toán không thành công");
      await db.OrderedSeat.destroy({
        where: {
          orderId: vnp_TxnRef,
        },
      });

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

      return res.redirect(`${process.env.URL_CLIENT}/dat-ve-that-bai`);
    }
  } catch (e) {
    // return res.send("Dữ liệu không hợp lệ");
    return res.redirect(`${process.env.URL_CLIENT}/dat-ve-that-bai`);
  }

  await db.OrderedSeat.update(
    { status: 1 },
    {
      where: { orderId: vnp_TxnRef },
    }
  );

  return res.send("Xác thực URL trả về thành công");
};

module.exports = {
  paymentVPN,
  verifyVnp,
};
