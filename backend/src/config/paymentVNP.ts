import { VNPay, ignoreLogger } from "vnpay";

// const hasdcode = 'SHA512'

// export const configVNP = () => {
export const vnpay = new VNPay({
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

// return vnpay;
// };
