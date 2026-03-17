import { Formik, Form } from "formik";
import { useState } from "react";
import { useCartProducts } from "../feautures/cart/useCartProducts";
import { useCartStore } from "../feautures/cart/cart.store";
import CheckoutFormFields from "../feautures/checkout/components/CheckoutFormFields";
import CartSummary from "../feautures/checkout/components/CartSummary";
import { checkoutValidationSchema } from "../feautures/checkout/validation";
import { buildOrderPayload } from "../feautures/checkout/buildOrderPayload";
import { handlePayment } from "../feautures/checkout/payment.service";
import type { CheckoutFormValues } from "../feautures/checkout/types";

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartProducts, subtotal, shipping, total, isLoading } = useCartProducts();
  const cart = useCartStore((s) => s.cart);

  const initialValues: CheckoutFormValues = {
    fullName: "",
    town: "",
    street: "",
    email: "",
    phone: "",
    agree: false,
    save: false,
    paymentMethod: "bank",
  };

  return (
    <Formik<CheckoutFormValues>
      initialValues={initialValues}
      validationSchema={checkoutValidationSchema}
      onSubmit={async (values) => {
        if (!cartProducts?.length) return;

        try {
          setIsProcessing(true);

          const payload = buildOrderPayload(
            values,
            cartProducts,
            subtotal,
            shipping,
            total
          );

          await handlePayment(values.paymentMethod, payload);
        } finally {
          setIsProcessing(false);
        }
      }}
    >
      {(formik) => (
        <Form className="flex flex-col lg:flex-row gap-8">
          <CheckoutFormFields formik={formik} />

          <CartSummary
            loading={isLoading}
            cartProducts={cartProducts}
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            formik={formik}
            isProcessing={isProcessing}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Checkout;
