// features/checkout/useVerifyPayment.ts
import { useQuery } from "@tanstack/react-query";
import { verifyPayment } from "./api/verifypayment";

export const useVerifyPayment = (reference: string | null) => {
  return useQuery({
    queryKey: ["verify-payment", reference],
    queryFn: () => verifyPayment(reference!),
    enabled: !!reference, // only run if reference exists
    retry: false,
  });
};
