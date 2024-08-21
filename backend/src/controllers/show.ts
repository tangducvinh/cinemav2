import { Request, Response } from "express";
import db from "../models";
import { Op } from "sequelize";

const getListShow = async (req: Request, res: Response) => {
  try {
    const { date, cinemaId, movieId, cityId } = req.query;

    const minTime = new Date(`${date} 00:00:00`);
    const maxTime = new Date(`${date} 23:59:59`);

    const response = await db.Show.findAll({
      where: {
        [Op.and]: [
          { timeStart: { [Op.gt]: minTime } },
          { timeEnd: { [Op.lt]: maxTime } },
          { movieId },
          cityId || "" !== "" ? { cityId } : {},
          cinemaId || "" !== "" ? { cinemaId } : {},
        ],
      },
      attributes: {
        exclude: ["cinemaId"],
      },
      include: [
        {
          model: db.Cinema,
          as: "cinema",
          attributes: ["name"],
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

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export { getListShow, getListDate };
