const db = require("../models");
const { Op } = require("sequelize");

const getListMovie = async (req, res) => {
  const { status, genre, year, page, limit } = req.query;

  const query = {};
  if (status) query.status = status;
  // if (genre) query["$genres.slug$"] = genre;
  if (year)
    query.release = {
      [Op.between]: [
        new Date(`${year}/1/1 00:00:00`),
        new Date(`${year}/12/31 23:59:59`),
      ],
    };

  console.log(query);

  const queries = {};
  const pages = page || 1;
  const limits = +limit || 10;

  queries.limit = limits;
  queries.offset = (pages - 1) * limits;
  // queries.raw = true;
  // queries.nest = true;

  try {
    let response;
    if (genre) {
      response = await db.Movie.findAndCountAll({
        where: query,
        include: [
          {
            model: db.Genre,
            as: "genres",
            attributes: ["name", "slug"],
            through: {
              attributes: [],
            },
            where: {
              slug: genre,
            },
          },
        ],
        ...queries,
      });
    } else {
      response = await db.Movie.findAndCountAll({
        where: query,
        include: [
          {
            model: db.Genre,
            as: "genres",
            attributes: ["name", "slug"],
            through: {
              attributes: [],
            },
          },
        ],
        ...queries,
      });
    }

    return res.json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    console.log(e);
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
