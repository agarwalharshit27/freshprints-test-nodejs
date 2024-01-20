import express, { NextFunction, Router } from "express";
import { checkOrderFulfilment } from "./order.service";

export const orderRoutes = express.Router();

orderRoutes.use("/order", orderRoutes)

orderRoutes.post('/check-fulfilment',  async (req: any, res: any, next: NextFunction) => {
  try {
    const data = req.body.data;
    const fulfilment = await checkOrderFulfilment(data)
    res.status(200).send({
      success: true,
      message: "Order fetched successfully!",
      fulfilment
    })
    next()
  } catch (e) {
    next(e)
  }
});