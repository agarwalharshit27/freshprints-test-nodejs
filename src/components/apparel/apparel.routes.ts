import express, { NextFunction } from "express";
import { updateApparelInventory } from "./apparel.service";

export const apparelRoutes = express.Router();

apparelRoutes.use("/apparel", apparelRoutes)

apparelRoutes.post('/inventory-update',  async (req: any, res: any, next: NextFunction) => {
  try {
    const data = req.body.data;
    const apparel = await updateApparelInventory(data);
    res.status(200).send({
      success: true,
      message: "Apparel updated successfully!",
      data: apparel
    })
    next()
  } catch (e) {
    next(e)
  }
});