// import { Request, Response } from "express";
// import db from "../models";
const db = require("../models");

const getListActor = async (req, res) => {
  try {
    const { country } = req.query;

    const query = {};
    if (country) query["$country.slug$"] = country;

    console.log(query);

    const response = await db.Actor.findAll({
      where: query,
      include: ["country"],
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

module.exports = {
  getListActor,
};
