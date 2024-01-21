import { getData } from "../../util";
import { IApparel, IApparelInventory } from "../apparel/apparel.interface";
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
    const apparelInventory: any = {}
    for (let i=0; i<orderItems.length; i++) {
      const orderItem = orderItems[i];
      let availableInventory: IApparelInventory[] = [];
      const filteredApparels = apparels.filter((element) => element.code === orderItem.code);
      if (filteredApparels.length) {
        filteredApparels.forEach(apparel => {
          const inventoryItemIdx = apparel.inventory.findIndex((ele) => ele.size === orderItem.size)
          if (inventoryItemIdx > -1) {
            availableInventory.push(apparel.inventory[inventoryItemIdx])
          } 
        })
       
      }
      if (apparelInventory[`${orderItem.code}-${orderItem.size}`]) {
        apparelInventory[`${orderItem.code}-${orderItem.size}`].inventory = [...apparelInventory[`${orderItem.code}-${orderItem.size}`], ...availableInventory]
      } else {
        apparelInventory[`${orderItem.code}-${orderItem.size}`] = {
          quantityRequired: orderItem.quantity,
          inventory: availableInventory
        }
      }
    }
    Object.keys(apparelInventory).forEach((key) => {
      const item = apparelInventory[key]
      let quantityToBeFulfilled = item.quantityRequired;
      item.inventory = item.inventory.sort((a: any, b: any) => a.price - b.price)
      item.inventory.forEach((element: IApparelInventory) => {
        if (quantityToBeFulfilled) {
          if (element.quantity > quantityToBeFulfilled) {
            orderPrice += quantityToBeFulfilled * element.price
            quantityToBeFulfilled = 0;
          } else {
            orderPrice += element.quantity * element.price
            quantityToBeFulfilled -= element.quantity
          }
        }
      })
    })
    return orderPrice;
  } catch (error) {
    throw error;
  }
}