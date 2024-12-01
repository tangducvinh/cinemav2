const db = require("../models");
const vnpay = require("../config/paymentVNP");
const { VerifyReturnUrl } = require("vnpay");
const { deleteOrderedSeat } = require("../services/order");
const sendMail = require("../config/sendmail");
require("dotenv").config();
const moment = require("moment");
const convertArrayToString = require("../ultis/convertArrayToString");
const convertDateToString = require("../ultis/convertDateToString");

const paymentVPN = async (req, res) => {
  const { amount, orderId, email } = req.body;
  const { id } = req.user;

  console.log({ id });
  const user = await db.User.findOne({ where: id, attributes: ["email"] });

  // Lấy returnUrl từ frontend gửi lên, nếu không có thì sử dụng mặc định
  // const returnUrl = req.body?.returnUrl || "http://localhost:3000/vnpay-return";
  const returnUrl = `${process.env.URL_SERVER}/api/payment/verify-vnp?email=${user.dataValues.email}`;
  // const returnUrl = `${process.env.URL_SERVER}/api/payment/verify-vnp`;

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
    vnp_OrderType: "this is email",
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
  const { vnp_TxnRef, email } = req.query;

  let verify;
  try {
    verify = vnpay.verifyReturnUrl(req.query);

    // if (!verify.isVerified) {
    //   console.log("hello 1");
    //   return res.redirect(`${process.env.URL_CLIENT}/booking-failed`);
    //   // return res.send("Xác thực tính toàn vẹn dữ liệu không thành công");
    // }
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

  res.redirect(`${process.env.URL_CLIENT}/booking-success`);

  const response = await db.Order.findOne({
    where: { id: vnp_TxnRef },
    include: [
      {
        model: db.OrderedSeat,
        as: "orderedSeats",
        include: [
          { model: db.Seat, as: "seat", attributes: ["number", "row"] },
        ],
        attributes: ["seatId"],
      },
      {
        model: db.OrderedFood,
        as: "orderedFoods",
        include: [{ model: db.Food, as: "food", attributes: ["name"] }],
        attributes: ["foodId"],
      },
      {
        model: db.Show,
        as: "show",
        include: [
          { model: db.Movie, as: "movie", attributes: ["name"] },
          {
            model: db.Cinema,
            as: "cinema",
            include: ["city"],
            attributes: ["name", "address"],
          },
          {
            model: db.Room,
            as: "room",
            attributes: ["name"],
          },
        ],
        attributes: ["id", "timeStart"],
      },
    ],
    attributes: ["showId", "id"],
  });

  const listRows = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
  ];

  const name = response.dataValues.show.movie.name;
  const seats = response.orderedSeats.map(
    (item) => `${listRows[item.seat.row]}${item.seat.number}`
  );
  const timeStart = moment(response.dataValues.show.timeStart);
  const cinemaName = response.dataValues.show.cinema.name;
  const cinemaAddress = response.dataValues.show.cinema.address;
  const city = response.dataValues.show.cinema.city.name;
  const food = response.orderedFoods.map((item) => item.food.name);
  const room = response.dataValues.show.room.name;

  // console.log({
  //   name,
  //   hour: moment(timeStart).format("HH:mm"),
  //   seats: convertArrayToString(seats),
  //   cinemaName,
  //   cinemaAddress,
  //   city,
  //   food: convertArrayToString(food),
  //   room,
  //   date: `${convertDateToString(
  //     Number(new Date(timeStart).getDay())
  //   )}: ${moment(timeStart).format("DD/MM/yyyy")}`,
  // });

  const html = ` <div style="width: 320px; background-color: white">
      <img
        style="width: 100px; height: 100px; display: block; margin: 0 auto"
        src="https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg"
      />

      <h1
        style="
          font-weight: 600;
          color: black;
          text-align: center;
          font-size: 23px;
        "
      >
        Chúc mừng! Bạn đã đặt vé thành công!
      </h1>
      <p
        style="
          margin: 0 auto;
          text-align: center;
          font-weight: 600;
          font-size: 16px;
        "
      >
        ${name}
      </p>

      <p style="text-align: center; color: gray">Vé 2D ${moment(
        timeStart
      ).format("HH:mm")} (${seats.length}) (Ghế: ${convertArrayToString(
    seats
  )})</p>

      <p style="text-align: center; color: gray">
        (${"Thức ăn"}: ${convertArrayToString(food)})
      </p>

      <p style="text-align: center; color: gray">
        <strong>${room}</strong>: ${cinemaAddress}, ${cinemaName}, ${city}
      </p>

      <table
        style="
          margin: 0 auto;
          border: 1px solid black;
          border: 1px solid black;
          border-collapse: collapse;
        "
      >
        <tr>
          <th
            colspan="2"
            style="
              text-align: start;
              border: 1px solid black;
              border-collapse: collapse;
            "
          >
            Ngày:
          </th>
          <th style="border: 1px solid black; border-collapse: collapse">
            Thời gian:
          </th>
          <th style="border: 1px solid black; border-collapse: collapse">
            Rạp:
          </th>
        </tr>
        <tr>
          <td
            colspan="2"
            style="
              color: #f5811f;
              font-weight: 600;
              border: 1px solid black;
              border-collapse: collapse;
            "
          >
          ${convertDateToString(
            Number(new Date(timeStart).getDay())
          )}: ${moment(timeStart).format("DD/MM/yyyy")}
          </td>
          <td
            style="
              color: #f5811f;
              font-weight: 600;
              border: 1px solid black;
              border-collapse: collapse;
            "
          >
            ${moment(timeStart).format("HH:mm")}
          </td>
          <td
            style="
              color: #f5811f;
              font-weight: 600;
              border: 1px solid black;
              border-collapse: collapse;
            "
          >
            ${room}
          </td>
        </tr>
      </table>

      <img
        style="width: 90px; height: 90px; margin: 10px auto; display: block"
        src="https://th.bing.com/th/id/R.fbd3782b74b283e3a06c44fc7600f0a8?rik=2WUTK7aTKMXbyA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fqr_code%2fqr_code_PNG6.png&ehk=nUlk4YKcz%2fILTzIDicRXimAOjkyFKx9ofIkscb3FFxA%3d&risl=&pid=ImgRaw&r=0"
      />

      <p
        style="
          background-color: #f5811f;
          color: white;
          font-size: 16px;
          padding: 6px 12px;
          width: 100px;
          text-align: center;
          margin: 0 auto;
          display: block;
          border-radius: 2px;
        "
      >
        Mã vé: 98972
      </p>
    </div>`;
  const subject = "Chúc mừng bạn đã đặt vé thành công!";
  await sendMail(email, html, subject);

  return;
};

module.exports = {
  paymentVPN,
  verifyVnp,
};
