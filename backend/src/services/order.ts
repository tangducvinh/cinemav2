import db from "../models";

export const deleteOrderedSeat = async (orderId: any) => {
  await db.OrderedSeat.destroy({
    where: {
      orderId: orderId,
    },
  });
};
