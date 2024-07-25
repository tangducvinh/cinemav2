import { Request, Response } from "express";
import db from "../models";

const getListBanner = async (req: Request, res: Response) => {
  try {
    console.log("hello 1");
    const response = await db.Banner.findAll();
    console.log(response);

    return res.json({
      data: response,
    });
  } catch (e) {
    console.log(e);
  }
};

export { getListBanner };
