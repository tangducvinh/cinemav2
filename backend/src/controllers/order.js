const db = require("../models");
const { listOrderedSeat } = require("../services/seat");
// const {
//   deleteOrder,
//   deleteOrderedSeat,
//   deleteOrderedFood,
// } = require("../services/order");
const serviceOrder = require("../services/order");
const moment = require("moment");
const convertArrayToString = require("../ultis/convertArrayToString");
const convertDateToString = require("../ultis/convertDateToString");

const createOrder = async (req, res) => {
  const { showId, listSeats } = req.body;
  const { id } = req.user;

  try {
    const orderedSeats = await listOrderedSeat(showId);

    // check seat ordered yet
    let check = false;
    await listSeats.forEach((item) => {
      if (
        orderedSeats.some(
          (orderedSeat) => orderedSeat.dataValues.seatId === item.seatId
        )
      ) {
        check = true;
      }
    });

    if (check) {
      return res.status(200).json({
        success: false,
        message: "Ghế đã được đặt",
      });
    }

    const response = await db.Order.create(
      {
        userId: id,
        showId,
        orderedSeats: listSeats,
      },
      {
        include: [
          {
            model: db.OrderedSeat,
            as: "orderedSeats",
          },
        ],
      }
    );

    console.log(response);

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getDetailOrder = async (req, res) => {
  const { orderId } = req.query;
  try {
    const response = await db.Order.findOne({
      where: { id: orderId },
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

    console.log(response);

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
    // // const
    const seats = response.orderedSeats.map(
      (item) => `${listRows[item.seat.row]}${item.seat.number}`
    );
    const timeStart = moment(response.dataValues.show.timeStart);
    const cinemaName = response.dataValues.show.cinema.name;
    const cinemaAddress = response.dataValues.show.cinema.address;
    const city = response.dataValues.show.cinema.city.name;
    const food = response.orderedFoods.map((item) => item.food.name);
    const room = response.dataValues.show.room.name;

    console.log({
      name,
      hour: moment(timeStart).format("HH:mm"),
      seats: convertArrayToString(seats),
      cinemaName,
      cinemaAddress,
      city,
      food: convertArrayToString(food),
      room,
      date: `${convertDateToString(
        Number(new Date(timeStart).getDay())
      )}: ${moment(timeStart).format("DD/MM/yyyy")}`,
    });

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const orderFood = async (req, res) => {
  const { listFoods } = req.body;
  try {
    const response = await db.OrderedFood.bulkCreate(listFoods);

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const deleteOrderAndOrderedSeat = async (req, res) => {
  const { orderId } = req.query;
  try {
    await serviceOrder.deleteOrderedSeat(orderId);
    await serviceOrder.deleteOrder(orderId);

    return res.status(200).json({
      success: true,
      message: "Đã xoá đơn đặt và ghế đã đặt thành công",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const deleteOrderedFood = async (req, res) => {
  const { orderId } = req.query;
  console.log({ orderId });
  try {
    await serviceOrder.deleteOrderedFood(orderId);

    return res.status(200).json({
      success: true,
      message: "Đã xoá đơn đặt đồ uống thành công",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = {
  createOrder,
  orderFood,
  deleteOrderAndOrderedSeat,
  deleteOrderedFood,
  getDetailOrder,
};
