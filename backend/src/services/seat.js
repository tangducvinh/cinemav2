const db = require("../models");
const { Op } = require("sequelize");

const listOrderedSeat = async (showId) => {
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

module.exports = { listOrderedSeat };
