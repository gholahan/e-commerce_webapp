import * as Yup from "yup";

export const checkoutValidationSchema = Yup.object({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  town: Yup.string().required("Required"),
  save: Yup.boolean(),
  agree: Yup.boolean().oneOf([true], "You must agree to terms and condition"),
  paymentMethod: Yup.string()
    .oneOf(["bank", "cash"])
    .required("Select a payment method"),
});
