import axios from "axios";
import type { OrderPayload, checkoutRes } from "../types";

const checkoutApi = axios.create({
  baseURL: import.meta.env.VITE_PAYMENTS_URL, // or payments URL if separate
});

export const postCheckout = async (payload:OrderPayload): Promise<checkoutRes> => {
    const {data} = await checkoutApi.post<checkoutRes>("/initialize-payment", payload)
    return data
}