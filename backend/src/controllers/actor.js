// import { Request, Response } from "express";
// import db from "../models";
const db = require("../models");

const getListActor = async (req, res) => {
  try {
    const { country } = req.query;

    const query = {};
    if (country) query["$country.slug$"] = country;

    console.log(query);

    const response = await db.Actor.findAndCountAll({
      where: query,
      include: ["country"],
    });

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
    console.log(e);
  }
};

const getDetailActor = async (req, res) => {
  try {
    const { slug } = req.query;
    const response = await db.Actor.findOne({
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

module.exports = {
  getListActor,
  getDetailActor,
};
