// import { Request, Response } from "express";
// import db from "../models";
const db = require("../models");

const getListBanner = async (req, res) => {
  try {
    const response = await db.Banner.findAll();

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
  getListBanner,
};
