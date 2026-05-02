import type { CartItem } from "../cart/cart.store";
import type { CheckoutFormValues, OrderPayload } from "./types";

export function buildOrderPayload(
  values: CheckoutFormValues,
  cartProducts: CartItem[],
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
    paymentMethod: values.paymentMethod
  };
}
