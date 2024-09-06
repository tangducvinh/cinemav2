import db from "../models";
import { Op } from "sequelize";

export const listOrderedSeat = async (showId: any) => {
  const now = new Date();
  const maxTime = new Date(now.getTime() - 7 * 60 * 1000);

  const response = await db.OrderedSeat.findAll({
    where: {
      showId,
      [Op.or]: [{ status: 1 }, { createdAt: { [Op.gt]: new Date(maxTime) } }],
    },
    attributes: ["seatId"],
  });

  return response;
};
