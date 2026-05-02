import { useEffect, useRef } from "react";
import FormInput from "../../../shared/components/FormInput";
import type { FormikProps } from "formik";
import type { CheckoutFormValues } from "../types";

interface CheckoutFormFieldsProps {
  formik: FormikProps<CheckoutFormValues>;
}

const CheckoutFormFields = ({ formik }: CheckoutFormFieldsProps) => {
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-3 lg:mr-22">
      <FormInput
        ref={firstInputRef}
        name="fullName"
        label="Full Name"
        required
        formik={formik}
        placeholder="Abdulazeez Ibraheem"
      />

      <FormInput
        name="street"
        label="Street address"
        required
        formik={formik}
      />

      <FormInput
        name="town"
        label="Town / City"
        required
        formik={formik}
        placeholder="Lagos"
      />

      <FormInput
        name="phone"
        label="Phone"
        required
        formik={formik}
      />

      <FormInput
        name="email"
        label="Email"
        type="email"
        required
        formik={formik}
      />
    </div>
  );
};

export default CheckoutFormFields;
