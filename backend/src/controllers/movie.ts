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
    const response = await db.Movie.findAll({
      where: {
        status,
      },
    });

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
    });

    // handle genre
    const genreIds = await Movie_Genre.findAll({
      attributes: ["id"],
      where: {
        movieId: movie.dataValues.id,
      },
    });
    const newGenreIds = genreIds.map((item) => item.dataValues.id);
    const genres = await Genre.findAll({
      attributes: ["id", "name", "slug"],
      where: {
        id: {
          [Op.in]: newGenreIds,
        },
      },
    });
    movie.dataValues.genres = genres;

    //handle director
    const directorIds = await db.Movie_Director.findAll({
      attributes: ["id"],
      where: {
        movieId: movie.dataValues.id,
      },
    });
    const newDirectorIds = directorIds.map((item) => item.dataValues.id);
    const directors = await db.Director.findAll({
      attributes: [
        "id",
        "name",
        "slug",
        "avatar",
        "birthday",
        "nation",
        "description",
      ],
      where: {
        id: {
          [Op.in]: newDirectorIds,
        },
      },
    });
    movie.dataValues.directors = directors;

    //handle actor
    const actorIds = await db.Movie_Actor.findAll({
      attributes: ["id"],
      where: {
        movieId: movie.dataValues.id,
      },
    });
    const newActorIds = actorIds.map((item) => item.dataValues.id);
    const actors = await db.Actor.findAll({
      attributes: [
        "id",
        "name",
        "slug",
        "avatar",
        "birthday",
        "nation",
        "description",
      ],
      where: {
        id: {
          [Op.in]: newActorIds,
        },
      },
    });
    movie.dataValues.actors = actors;

    return res.json(movie);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export { getListMovie, getDetailMovie };
