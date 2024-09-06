import { Request, Response } from "express";
import db from "../models";
import { listOrderedSeat } from "../services/seat";

export const createOrder = async (req: Request, res: Response) => {
  const { userId, showId, listSeats } = req.body;

  try {
    const orderedSeats = await listOrderedSeat(showId);

    // check seat ordered yet
    let check = false;
    await listSeats.forEach((item) => {
      if (
        orderedSeats.some(
          (orderedSeat) => orderedSeat.dataValues.seatId === item.seatId
        )
      ) {
        check = true;
      }
    });

    if (check) {
      return res.status(200).json({
        success: false,
        message: "Ghế đã được đặt",
      });
    }

    const response = await db.Order.create(
      {
        userId,
        showId,
        orderedSeats: listSeats,
      },
      {
        include: [
          {
            model: db.OrderedSeat,
            as: "orderedSeats",
          },
        ],
      }
    );

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Thành công" : "Thất bại",
      data: response ? response : "no data",
    });
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const orderFood = async (req: Request, res: Response) => {
  const { listFoods } = req.body;
  try {
    const response = await db.OrderedFood.bulkCreate(listFoods);

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
