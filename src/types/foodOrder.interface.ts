export interface IFood {
  id: number;
  category_name: string;
  products: IProduct[];
  categories: any[];
}

export interface IProduct {
  product_id: number;
  name: string;
  descr: string;
  price: number;
  media: string;
  category_name: string;
}

export interface IOrder extends IProduct {
  count: number;
}

export type TResponseForBot = { order: IOrder[]; comments: string };
