import type { Product } from "./product";

export interface ProductRes{
  products : Product[];
  total: number;
  skip:number;
  limit :number
}