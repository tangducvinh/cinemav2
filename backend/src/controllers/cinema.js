const db = require("../models");

const cinemaController = {
  getListCinema: async (req, res) => {
    try {
      const { cityId } = req.query;
      const response = await db.Cinema.findAll({
        where: {
          cityId,
        },
      });

      return res.status(200).json({
        success: response ? true : false,
        message: response ? "Thành công" : "Thất bại",
        data: response ? response : "no data",
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};

module.exports = { cinemaController };
