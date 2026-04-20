import type { OrderPayload, PaymentMethod } from "./types";

async function handleCash(payload: OrderPayload) {
  console.log("Create COD order:", payload);
  await new Promise((res) => setTimeout(res, 1000));
  return { success: true };
}

async function handleBank(payload: OrderPayload) {
  console.log("Initialize online payment:", payload);
  return { success: true };
}

export async function handlePayment(
  method: PaymentMethod,
  payload: OrderPayload
) {
  if (method === "cash") return handleCash(payload);
  if (method === "bank") return handleBank(payload);

  throw new Error("Invalid payment method");
}
