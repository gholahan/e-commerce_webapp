import { Formik, Form } from "formik";

import { useCartProducts } from "../feautures/cart/useCartProducts";
import { useCartStore } from "../feautures/cart/cart.store";
import CheckoutFormFields from "../feautures/checkout/components/CheckoutFormFields";
import CartSummary from "../feautures/checkout/components/CartSummary";
import { checkoutValidationSchema } from "../feautures/checkout/validation";
import { buildOrderPayload } from "../feautures/checkout/buildOrderPayload";
import type { CheckoutFormValues} from "../feautures/checkout/types";
import { useCheckout } from "../feautures/checkout/useCheckout";
import { toast } from "react-toastify";



const Checkout = () => {
  const { CheckoutAsync, isPending, isError} = useCheckout();

  const { cartProducts, subtotal, shipping, total, isLoading, apiError } = useCartProducts();
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
        try {
          
          const response = await CheckoutAsync(
            buildOrderPayload(values, cart)
          );

          window.location.href = response.checkout_url;
        if(isError){
          console.error("Checkout failed:", isError);
          toast("Checkout failed. Please try again.");
        }
        } catch (err) {
          console.error("Checkout failed:", err);
        }
      }}
    >
      {(formik) => (
        <Form className="flex flex-col lg:flex-row gap-8">
          <CheckoutFormFields formik={formik} />

          <CartSummary
            loading={isLoading}
            error={apiError}
            cartProducts={cartProducts}
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            formik={formik}
            isProcessing={isPending}
            payError={isError}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Checkout;
