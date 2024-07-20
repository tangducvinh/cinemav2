import { Request, Response } from "express";

let getHomePage = (req: Request, res: Response) => {
  return res.send("home");
};

export { getHomePage };
