const db = require("../models");

const getListDirector = async (req, res) => {
  try {
    const response = await db.Director.findAndCountAll();

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

const getDetailDirector = async (req, res) => {
  try {
    const { slug } = req.query;
    const response = await db.Director.findOne({
      where: { slug },
      include: [
        {
          model: db.Movie,
          as: "movies",
          attributes: ["name", "slug", "backdrop"],
          through: { attributes: [] },
        },
        {
          model: db.Country,
          as: "country",
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
    return res.status(500).json(e);
  }
};

module.exports = { getListDirector, getDetailDirector };
