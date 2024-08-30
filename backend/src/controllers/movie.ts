import { Request, Response } from "express";
import db from "../models";
import { Movie, Movie_Genre, Genre } from "../models";
// import { Op } from "sequelize";
import { Op, sql } from "@sequelize/core";
import { attribute } from "@sequelize/core/types/expression-builders/attribute";
const { QueryTypes } = require("sequelize");
import { Sequelize } from "sequelize";

const getListMovie = async (req: Request, res: Response) => {
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

const getDetailMovie = async (req: Request, res: Response) => {
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

export { getListMovie, getDetailMovie };
