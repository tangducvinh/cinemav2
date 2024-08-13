import { Request, Response } from "express";
import db from "../models";

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

    console.log(movie.dataValues.id);

    const genre = await db.Movie_Genre.findAll({
      where: {
        movieId: movie.dataValues.id,
      },
    });

    return res.json(genre);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export { getListMovie, getDetailMovie };
