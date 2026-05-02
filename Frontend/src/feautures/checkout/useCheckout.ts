import { useMutation } from "@tanstack/react-query";
import { postCheckout } from "./api/checkoutApi";
import type { checkoutRes, OrderPayload } from "./types";

export const useCheckout = () => {
  const mutation = useMutation<checkoutRes, Error, OrderPayload>({
    mutationKey: ["checkout"],
    mutationFn: (payload: OrderPayload) => postCheckout(payload),
  });

  return {
    ...mutation,
    startCheckout: mutation.mutate,
    CheckoutAsync: mutation.mutateAsync,
  };
};
