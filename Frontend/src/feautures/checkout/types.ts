import type { FormikProps } from "formik";
import type { Product } from "../products/types/product";
import type {CartItem} from "../cart/cart.store"

export type PaymentMethod = "bank" | "cash"

export interface CheckoutFormValues {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  town: string;
  save: boolean;
  agree: boolean;
  paymentMethod: PaymentMethod;
}

export interface OrderPayload {
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    town: string;
  };
  items: CartItem[];
  paymentMethod: PaymentMethod;
}

export interface CartSummaryProps {
  loading: boolean;
  cartProducts: Product[];
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  formik: FormikProps<CheckoutFormValues>;
  isProcessing?: boolean;
  error: boolean
  payError: boolean
}

export interface checkoutRes {
  "checkout_url": string,
  "reference": string,
  "order_id": string,
  "subtotal": number,
  "total": number,
  "payment_status": string,
  "amount_paid_ngn": number
}


