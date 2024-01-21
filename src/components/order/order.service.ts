import { getData } from "../../util";
import { IApparel } from "../apparel/apparel.interface";
import { IOrderItemFulfilment } from "./order.interface";

export const checkOrderFulfilment = async (orderItems: IOrderItemFulfilment[]) => {
  try {
    if (!orderItems.length) {
      throw new Error("Minimum 1 order item details required to check status")
    }
    const data = await getData();
    const apparels: IApparel[] = data.apparels;
    let fulfilment = true;
    for (let i=0; i<orderItems.length; i++) {
      const orderItem = orderItems[i];
      const filteredApparels = apparels.filter((element) => element.code === orderItem.code);
      if (filteredApparels.length) {
        let quantityToBeFulfilled = orderItem.quantity;
        filteredApparels.forEach(apparel => {
          const inventoryItemIdx = apparel.inventory.findIndex((ele) => ele.size === orderItem.size)
          if (inventoryItemIdx > -1) {
            const inventoryItem = apparel.inventory[inventoryItemIdx]
            if (inventoryItem.quantity >= quantityToBeFulfilled) {
              quantityToBeFulfilled = 0
            } else {
              quantityToBeFulfilled -= inventoryItem.quantity
            }
          } else {
            fulfilment = false;
          }
        })
        if (quantityToBeFulfilled) {
          fulfilment = false
        }
      } else {
        fulfilment = false;
      }
    }
    return fulfilment
  } catch (error) {
    throw error;
  }
}

export const checkMinPriceForOrderFulfilment = async (orderItems: IOrderItemFulfilment[]) => {
  try {
    if (!orderItems.length) {
      throw new Error("Minimum 1 order item details required to check status")
    }
    const data = await getData();
    const apparels: IApparel[] = data.apparels;
    let orderPrice = 0;
    let fulfilment = true;
    for (let i=0; i<orderItems.length; i++) {
      const orderItem = orderItems[i];
      const filteredApparels = apparels.filter((element) => element.code === orderItem.code);
      if (filteredApparels.length) {
        let quantityToBeFulfilled = orderItem.quantity;
        filteredApparels.forEach(apparel => {
          const inventoryItemIdx = apparel.inventory.findIndex((ele) => ele.size === orderItem.size)
          if (inventoryItemIdx > -1) {
            const inventoryItem = apparel.inventory[inventoryItemIdx]
            if (inventoryItem.quantity >= quantityToBeFulfilled) {
              quantityToBeFulfilled = 0
            } else {
              quantityToBeFulfilled -= inventoryItem.quantity
            }
          } else {
            fulfilment = false;
          }
        })
        if (quantityToBeFulfilled) {
          fulfilment = false
        }
      } else {
        fulfilment = false;
      }
    }
  } catch (error) {
    throw error;
  }
}