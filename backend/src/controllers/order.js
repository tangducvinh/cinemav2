const db = require("../models");
const { listOrderedSeat } = require("../services/seat");
const {
  deleteOrder,
  deleteOrderedSeat,
  SVdeleteOrderedFood,
} = require("../services/order");

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
          include: [{model: db.Seat, as: 'seat', attributes: ['number', 'row']}],
          attributes: ['seatId']
        },
        {
          model: db.OrderedFood,
          as: "orderedFoods",
          include: [{model: db.Food, as: 'food', attributes: ['name']}],
          attributes: ['foodId']
        },
        {
          model: db.Show,
          as: "show",
          include: [{model: db.Movie, as: 'movie', attributes: ['name']}, {model: db.Cinema, as: 'cinema', include: ['city'], attributes: ['name', 'address']}],
          attributes: ['id']
        },
      ],
      attributes: ['showId']
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
    await deleteOrderedSeat(orderId);
    await deleteOrder(orderId);

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
  try {
    await SVdeleteOrderedFood(orderId);

    return res.status(200).json({
      success: true,
      message: "Đã xoá đơn đặt đồ uống thành công",
    });
  } catch (e) {
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
