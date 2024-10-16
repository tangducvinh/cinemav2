// import { Request, Response } from "express";
// import db from "../models";
const db = require("../models");

const getListActor = async (req, res) => {
  try {
    const { country, page, limit } = req.query;

    const query = {};
    if (country) query["$country.slug$"] = country;

    // pagination
    const queries = {};
    const pages = page || 1;
    const limits = +limit || 10;

    queries.limit = limits;
    queries.offset = (pages - 1) * limits;

    const response = await db.Actor.findAndCountAll({
      where: query,
      include: ["country"],
      ...queries,
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
