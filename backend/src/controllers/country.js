const db = require("../models");

const getListCountries = async (req, res) => {
  try {
    const response = await db.Country.findAll();

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = getListCountries;
