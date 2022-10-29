import axios from "axios";
import { IFood } from "../types/foodOrder.interface";

export const url = "https://chunoadmin.cryptopunk.tech";

export async function getProducts(): Promise<IFood[]> {
  return (await axios.get(`${url}/api/products/`)).data;
}
