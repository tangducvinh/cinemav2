import db from "../models";
import { Request, Response } from "express";

const getListFoods = async (req: Request, res: Response) => {
  try {
    const response = await db.Food.findAll();

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

export { getListFoods };
