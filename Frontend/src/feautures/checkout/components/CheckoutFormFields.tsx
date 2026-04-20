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

      <div>
        <div className="flex items-center gap-2">
          <input
            name="save"
            type="checkbox"
            checked={formik.values.save}
            onChange={formik.handleChange}
            className="w-4 h-4"
          />
          <label className="text-gray-600 text-sm">
            Save this information for faster check-out next time
          </label>
        </div>

        <div className="flex items-center gap-2 mt-2.5">
          <input
            name="agree"
            type="checkbox"
            checked={formik.values.agree}
            onChange={formik.handleChange}
            className="w-4 h-4"
          />
          <label className="text-gray-600 text-sm">
            Agree to terms and condition
          </label>
        </div>

        {formik.touched.agree && formik.errors.agree && (
          <div className="text-sm text-red-600 mt-2">
            {formik.errors.agree}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutFormFields;
