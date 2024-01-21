import express, { NextFunction } from "express";
import { updateApparelInventory } from "./apparel.service";
import { body, validationResult } from "express-validator";

export const apparelRoutes = express.Router();

apparelRoutes.use("/apparel", apparelRoutes)

apparelRoutes.post('/inventory-update', 
  body("data").exists().isArray({ min: 1 }),
  body("data.*").exists({ checkFalsy: true, checkNull: true }).isObject().isLength({ min: 1 }),
  body("data.*.vendorId").exists({ checkFalsy: true, checkNull: true }).isString().isLength({ min: 1 }),
  body("data.*.apparelId").exists({ checkFalsy: true, checkNull: true }).isString().isLength({ min: 1 }),
  body("data.*.code").exists({ checkFalsy: true, checkNull: true }).isString().isLength({ min: 1 }),
  body("data.*.inventory").exists().isArray({ min: 1 }),
  body("data.*.inventory.*.size").exists({ checkFalsy: true, checkNull: true }).isString().isLength({ min: 1 }),
  body("data.*.inventory.*.quantity").exists().isNumeric(),
  body("data.*.inventory.*.price").exists().isNumeric(),
  async (req: any, res: any, next: NextFunction) => {
    try {
      // #region Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("API Parameters Validation failed");
      }
      // #endregion Validation
      const data = req.body.data;
      const response = await updateApparelInventory(data);
      res.status(200).send({
        success: true,
        message: "Apparel updated successfully!",
      })
      next()
    } catch (e) {
      next(e)
    }
  }
);