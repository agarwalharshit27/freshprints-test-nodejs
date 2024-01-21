import express, { NextFunction, Router } from "express";
import { checkOrderFulfilment } from "./order.service";
import { body, validationResult } from "express-validator";

export const orderRoutes = express.Router();

orderRoutes.use("/order", orderRoutes)

orderRoutes.post('/check-fulfilment', 
  body("data").exists().isArray({ min: 1 }),
  body("data.*").exists({ checkFalsy: true, checkNull: true }).isObject().isLength({ min: 1 }),
  body("data.*.code").exists({ checkFalsy: true, checkNull: true }).isString().isLength({ min: 1 }),
  body("data.*.size").exists({ checkFalsy: true, checkNull: true }).isString().isLength({ min: 1 }),
  body("data.*.quantity").exists().isNumeric(),
  async (req: any, res: any, next: NextFunction) => {
    try {
      // #region Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("API Parameters Validation failed");
      }
      // #endregion Validation
      const data = req.body.data;
      const fulfilment = await checkOrderFulfilment(data)
      res.status(200).send({
        success: true,
        message: "Fulfilment status fetched successfully!",
        fulfilment
      })
      next()
    } catch (e) {
      next(e)
    }
  }
);