import db from "../models";

export const deleteOrderedSeat = async (orderId: any) => {
  await db.OrderedSeat.destroy({
    where: {
      orderId: orderId,
    },
  });
};

export const deleteOrder = async (orderId: any) => {
  await db.Order.destroy({
    where: {
      id: orderId,
    },
  });
};

export const deleteOrderedFood = async (orderId: any) => {
  await db.OrderedFood.destroy({
    where: {
      orderId,
    },
  });
};
