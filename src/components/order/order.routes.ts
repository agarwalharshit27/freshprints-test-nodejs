import express, { NextFunction, Router } from "express";

export const orderRoutes = express.Router();

orderRoutes.use("/order", orderRoutes)

orderRoutes.get('/',  async (req: any, res: any, next: NextFunction) => {
  try {
    res.status(200).send({
      success: true,
      message: "Order fetched successfully!",
    })
    next()
  } catch (e) {
    next(e)
  }
});