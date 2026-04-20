import type { FormikProps } from "formik";
import type { Product } from "../products/types/product";

export type PaymentMethod = "bank" | "cash";

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
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: "pending";
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartSummaryProps {
  loading: boolean;
  cartProducts: Product[];
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  formik: FormikProps<any>;
  isProcessing?: boolean;
}

