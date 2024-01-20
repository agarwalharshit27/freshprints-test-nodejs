export interface IOrder {
  id: string;
  createdAt: string;
  customer: string; // id of customer for whom the order was created
  orderItems: IOrderItem[]
  totalAmount: number; // Total amount of the order
  billingAddress: IOrderAddress;
  shippingAddress: IOrderAddress;
}

export interface IOrderItem {
  id: string;
  apparel: string; // Id of apparel
  size: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalAmount: number; // Total amount of the order item
}

export interface IOrderAddress {
  nickname?: string;
  recipientName: string;
  address1: string;
  address2?: string;
  street?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  contactNumber: IContactNumber;
}

export interface IContactNumber {
  countryCode: string;
  phoneNumber: string;
}

export interface IOrderItemFulfilment {
  code: string; // code of apparel
  size: string;
  quantity: number;
}