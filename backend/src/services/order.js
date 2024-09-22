const db = require("../models");
const SVdeleteOrderedSeat = async (orderId) => {
  await db.OrderedSeat.destroy({
    where: {
      orderId: orderId,
    },
  });
};
const deleteOrder = async (orderId) => {
  await db.Order.destroy({
    where: {
      id: orderId,
    },
  });
};
const deleteOrderedFood = async (orderId) => {
  await db.OrderedFood.destroy({
    where: {
      orderId,
    },
  });
};

module.exports = { deleteOrder, SVdeleteOrderedSeat, deleteOrderedFood };
