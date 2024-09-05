import db from "../models";
import { Request, Response } from "express";
import { Op } from "sequelize";

export const getListSeat = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.query;
    const response = await db.Seat.findAll({
      where: {
        roomId,
      },
      order: [
        ["row", "asc"],
        ["column", "asc"],
      ],
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

export const getListOrderedSeat = async (req: Request, res: Response) => {
  try {
    const { showId } = req.query;

    const now = new Date();
    const maxTime = new Date(now.getTime() - 7 * 60 * 1000);

    const response = await db.OrderedSeat.findAll({
      where: {
        showId,
        [Op.or]: [{status: 1}, {createdAt: { [Op.gt]: new Date(maxTime) }}],
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
