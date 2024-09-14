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

export const createAutoSeats = async (req: Request, res: Response) => {
  //status: 1 normal
  // status: 2 broken
  try {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 29; j++) {
        if (j === 4 || j === 5 || j === 23 || j === 24) {
            await db.Seat.create({
              name: 0,
              roomId: 1,
              number: 0,
              row: i,
              column: j,
              status: 2,
              ticketPrice: 0,
            });
        } else if (j <= 3) {
          await db.Seat.create({
            name: j + 1,
            roomId: 1,
            number: j + 1,
            row: i,
            column: j,
            status: 1,
            ticketPrice: 70000,
          });
        } else if (j <= 22) {
          await db.Seat.create({
            name: j + 1 - 2,
            roomId: 1,
            number: j + 1 - 2,
            row: i,
            column: j,
            status: 1,
            ticketPrice: 70000,
          });
        } else {
          await db.Seat.create({
            name: j + 1 - 4,
            roomId: 1,
            number: j + 1 - 4,
            row: i,
            column: j,
            status: 1,
            ticketPrice: 70000,
          });
        }
    
      }
    }

    // for (let i = 34000; i < 35000; i++) {
    //   await db.Seat.destroy({ where: { id: i } });
    // }

    return res.status(200).json("ok");
  } catch (e) {
    return res.status(500).json(e);
  }
};
