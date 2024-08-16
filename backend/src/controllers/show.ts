import { Request, Response } from "express";
import db from "../models";
import { Op } from "sequelize";

const getListShow = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    const minTime = new Date(`${date} 00:00:00`);
    const maxTime = new Date(`${date} 23:59:59`);

    const listShows = await db.Show.findAll({
      where: {
        [Op.and]: [
          { timeStart: { [Op.gt]: minTime } },
          { timeEnd: { [Op.lt]: maxTime } },
        ],
      },
    });

    return res.status(200).json(listShows);
  } catch (e) {
    console.log(e);
  }
};

const getListDate = async (req: Request, res: Response) => {
  try {
    const { slug } = req.query;

    const movieId = await db.Movie.findOne({
      where: {
        slug,
      },
    });

    // console.log(movieId.dataValues.id)

    const response = await db.Show.findAll({
      attributes: ["timeStart"],
      distinct: true,
      where: {
        movieId: movieId.dataValues.id,
      },
    });

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export { getListShow, getListDate };
