const db = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const moment = require("moment");

const getListShow = async (req, res) => {
  try {
    const { date, cinemaId, movieId, cityId } = req.query;

    const minTime = new Date(`${date} 00:00:00`);
    const maxTime = new Date(`${date} 23:59:59`);

    const response = await db.Show.findAll({
      where: {
        [Op.and]: [
          { timeStart: { [Op.gt]: minTime } },
          { timeEnd: { [Op.lt]: maxTime } },
          { movieId },
          cityId || "" !== "" ? { cityId } : {},
          cinemaId || "" !== "" ? { cinemaId } : {},
        ],
      },
      order: [["cinemaId", "asc"]],
      attributes: {
        // exclude: ["cinemaId"],
      },
      include: [
        {
          model: db.Cinema,
          as: "cinema",
          attributes: ["name"],
        },
        {
          model: db.Movie,
          as: "movie",
          attributes: ["slug"],
        },
      ],
    });

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    console.log(e);
  }
};

const getDetailShow = async (req, res) => {
  try {
    const { showId } = req.query;

    const response = await db.Show.findOne({
      where: {
        id: showId,
      },
      include: [
        {
          model: db.Movie,
          as: "movie",
          attributes: ["name", "poster"],
        },
        {
          model: db.Cinema,
          as: "cinema",
          attributes: ["name"],
        },
        {
          model: db.Room,
          as: "room",
          attributes: ["name", "width", "height"],
        },
      ],
      attributes: {
        exclude: ["createAt", "updateAt"],
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
};

const getCinemaByMovieId = async (req, res) => {
  const { movieId } = req.query;
  try {
    const response = await db.Show.findAll({
      where: { movieId, timeStart: { [Op.gte]: new Date() } },
      include: ["cinema"],
      // attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("cinemaId")), "id"]],
      attributes: ["cinemaId"],
      distinct: true,
      group: ["cinemaId"],
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

const getDateFastBooking = async (req, res) => {
  try {
    const { movieId, cinemaId } = req.query;

    const response = await db.Show.findAll({
      where: { cinemaId, movieId, timeStart: { [Op.gte]: new Date() } },
      attributes: ["timeStart"],
    });

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getShowFastBooking = async (req, res) => {
  try {
    const { movieId, cinemaId, date } = req.query;

    let response;
    if (new Date().getDate() !== new Date(date).getDate()) {
      response = await db.Show.findAll({
        where: {
          movieId,
          cinemaId,
          timeStart: {
            [Op.between]: [
              new Date(`${date} 00:00:00`),
              new Date(`${date} 23:59:59`),
            ],
          },
        },
        include: [
          {
            model: db.Movie,
            as: "movie",
            attributes: ["slug"],
          },
        ],
      });
    } else {
      const timeNow = moment(new Date().getTime()).format("HH:mm:ss");
      response = await db.Show.findAll({
        where: {
          movieId,
          cinemaId,
          timeStart: {
            [Op.between]: [
              new Date(`${date} ${timeNow}`),
              new Date(`${date} 23:59:59`),
            ],
          },
        },
        include: [
          {
            model: db.Movie,
            as: "movie",
            attributes: ["slug"],
          },
        ],
      });
    }
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  getListShow,
  getDetailShow,
  getCinemaByMovieId,
  getDateFastBooking,
  getShowFastBooking,
};
