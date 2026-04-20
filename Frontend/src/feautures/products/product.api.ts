import type { Product } from "./types/product";
import type { ProductRes } from "./types/productRes";
import api from "../app/axios";

export const fetchAllProduct = async (skip:number, limit:number):Promise<ProductRes>=>{
  const {data} = await api.get<ProductRes>("/products",{
    params:{skip, limit}
    })
  return data
};

export const eachProduct = async (id:number):Promise<Product> => {
  const {data} = await api.get<Product>(`/products/${id}`);
  return data
}

export const getSearch = async (search:string, skip:number, limit:number):Promise<ProductRes> => {
   const {data} = await api.get<ProductRes>("/products/search",{
    params:{q:search, skip, limit}
   });
   return data
}

export const getProductByCategory = async (category:string, skip:number, limit:number):Promise<ProductRes> => {
   const {data} = await api.get<ProductRes>(`/products/category/${category}`,{
    params:{skip, limit}
   });
   return data
}

export const getCategories = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/products/category-list');
  return data;
};