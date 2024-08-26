import db from "../models";
import { Request, Response } from "express";

const seatController = {
  getListSeat: async (req: Request, res: Response) => {
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
  },
};

export default seatController;
