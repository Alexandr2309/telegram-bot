import { IProduct, IOrder } from "../types/foodOrder.interface";

export function setProductsToSessionStorge(products: IProduct[]) {
  const productsString = JSON.stringify(products);
  sessionStorage.setItem("products", productsString);
}

export function getProductsFromSessionStorge(): IProduct[] | null {
  const productsFromStorage = sessionStorage.getItem("products");
  let products: IProduct[] | null = null;
  if (productsFromStorage && typeof productsFromStorage === "string") {
    products = JSON.parse(productsFromStorage);
  }
  return products;
}

export function setCartsToSessionStorge(carts: IOrder[]) {
  const cartsString = JSON.stringify(carts);
  sessionStorage.setItem("carts", cartsString);
}

export function getCartsFromSessionStorge(): IOrder[] | null {
  const cartsFromStorage = sessionStorage.getItem("carts");
  let carts: IOrder[] | null = null;
  if (cartsFromStorage && typeof cartsFromStorage === "string") {
    carts = JSON.parse(cartsFromStorage);
  }
  return carts;
}
