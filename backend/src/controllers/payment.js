const { VNPay, ignoreLogger } = require("vnpay");
const db = require("../models");
const { Association } = require("sequelize");

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

const paymentVPN = async (req, res) => {
  const { amount, userId, showId, listSeats, listFoods } = req.body;

  console.log({ userId });
  // console.log({ orderedSeats });
  console.log({ showId });
  // const order = await createOrder(req.body); // Hàm tạo đơn hàng, bạn cần tự cài đặt

  const OrderedFood = db.Order.hasMany(db.OrderedFood, { as: "orderedFoods" });
  const OrderedSeat = db.Order.hasMany(db.OrderedSeat, {as: 'orderedSeats'})

  const order = await db.Order.create(
    {
      userId,
      showId,
      orderedSeats: [
        { seatId: 1, showId: 1 },
        { seatId: 2, showId: 1 },
      ],
      orderedFoods: [
        { foodId: 1, quantity: 1 },
        { foodId: 2, quantity: 20 },
      ],
    },
    {
      include: [
        {
          association: OrderedSeat,
          as: "orderedSeats",
        },
        {
          association: OrderedFood,
          as: "orderedFoods",
        },
      ],
    }
  );

  // Lấy returnUrl từ frontend gửi lên, nếu không có thì sử dụng mặc định
  const returnUrl = req.body?.returnUrl || "http://localhost:3000/vnpay-return";

  // Tạo URL thanh toán
  const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: 10000,
    vnp_IpAddr:
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.ip,
    vnp_TxnRef: "1234523",
    vnp_OrderInfo: "Thanh toan don hang 12345 dsf",
    // vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: returnUrl, // Đường dẫn nên là của frontend
    // vnp_Locale: VnpLocale.VN,
  });

  return res.json({ paymentUrl, order });
};

module.exports = {
  paymentVPN,
};
