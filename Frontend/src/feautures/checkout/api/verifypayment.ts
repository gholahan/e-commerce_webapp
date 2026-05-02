import axios from "axios";

export const verifyPayment = async (reference: string) => {
  const res = await axios.get(`/api/verify-payment?reference=${reference}`);
  return res.data;
};
