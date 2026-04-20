import type { CheckoutFormValues, OrderPayload } from "./types";

export function buildOrderPayload(
  values: CheckoutFormValues,
  cartProducts: any[],
  subtotal: number,
  shipping: number,
  total: number
): OrderPayload {
  return {
    customer: {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone.replace(/\s+/g, ""),
    },
    address: {
      street: values.street,
      town: values.town,
    },
    items: cartProducts,
    subtotal,
    shipping,
    total,
    paymentMethod: values.paymentMethod,
    status: "pending",
  };
}
