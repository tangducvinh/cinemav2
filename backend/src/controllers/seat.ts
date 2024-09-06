import { attribute } from "@sequelize/core/types/expression-builders/attribute";
import db from "../models";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { listOrderedSeat } from "../services/seat";

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

    const response = await listOrderedSeat(showId);

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};
