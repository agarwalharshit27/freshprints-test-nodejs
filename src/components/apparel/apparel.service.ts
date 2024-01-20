import { config } from "../../config";
import { getData } from "../../util";
import { IApparel, IInventoryUpdateArgs } from "./apparel.interface";
import fs from "fs";

export const updateApparelInventory = async (args: IInventoryUpdateArgs[]) => {
  try {
    if (!args.length) {
      throw new Error("Minimum 1 apparel details required to update")
    }
    let apparels: IApparel[] = []; 
    const data = await getData()
    if (data?.apparels?.length) {
      apparels = data.apparels
    }
    for (let i=0; i<args.length; i++) {
      const item = args[i]
      const apparelIdx = apparels.findIndex((element) => element.id === item.apparelId && element.code === item.code && element.vendor === item.vendorId)
      if (apparelIdx > -1) {
        const apparel = apparels[apparelIdx]
        if (apparel) {
          item.inventory.forEach((inventoryItem) => {
            const idx = apparel.inventory.findIndex((ele) => ele.size === inventoryItem.size)
            if (idx > -1) {
              apparel.inventory[idx].price = inventoryItem.price
              apparel.inventory[idx].quantity = inventoryItem.quantity
            } else {
              apparel.inventory.push({
                size: inventoryItem.size,
                price: inventoryItem.price,
                quantity: inventoryItem.quantity
              })
            }
          })
        }
        apparels[apparelIdx] = apparel
      }
    }
    data.apparels = apparels
    fs.writeFileSync(config.dataFile, JSON.stringify(data))
    return true
  } catch (error) {
    throw error;
  }
}