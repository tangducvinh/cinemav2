import { Request, Response } from "express";
import db from "../models";

const getListMovie = async (req: Request, res: Response) => {
  const { status } = req.query;

  console.log(status);

  try {
    const response = await db.Movie.findAll({
      where: {
        status,
      },
    });
    console.log(response);

    return res.json({
      data: response,
    });
  } catch (e) {
    console.log(e);
  }
};

export { getListMovie };
