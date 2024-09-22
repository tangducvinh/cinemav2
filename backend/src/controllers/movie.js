const db = require("../models");

const getListMovie = async (req, res) => {
  const { status } = req.query;

  try {
    let response;
    if (status) {
      response = await db.Movie.findAll({
        where: {
          status,
        },
      });
    } else {
      response = await db.Movie.findAll();
    }

    return res.json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getDetailMovie = async (req, res) => {
  try {
    const { slug } = req.query;

    const movie = await db.Movie.findOne({
      where: {
        slug,
      },
      include: [
        {
          model: db.Genre,
          as: "genres",
          attributes: ["id", "name", "slug"],
        },
        {
          model: db.Actor,
          as: "actors",
          attributes: ["id", "name", "slug"],
        },
        {
          model: db.Director,
          as: "directors",
          attributes: ["id", "name", "slug"],
        },
      ],
    });

    return res.json(movie);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

module.exports = { getListMovie, getDetailMovie };
