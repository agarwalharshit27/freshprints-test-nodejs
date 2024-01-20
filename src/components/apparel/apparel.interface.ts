export interface IApparel {
  id: string;
  code: string;
  inventory: IApparelInventory[];
  title: string;
  images: IImage[];
  category: string;
  tags: string[];
  color: string;
  vendor: string; // id of vendor
}

export interface IApparelInventory {
  quantity: number;
  size: string;
  price: number;
}

export interface IImage {
  id: string;
  url: string;
  idx: number;
  altText: string;
}

export interface IInventoryUpdateArgs {
  apparelId: string;
  code: string;
  inventory: IApparelInventory[];
  vendorId: string
}