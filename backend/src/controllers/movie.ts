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

export { getListMovie };
