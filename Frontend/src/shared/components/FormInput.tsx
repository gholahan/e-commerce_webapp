import { forwardRef } from "react";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  formik: any;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  formik,
}: FormInputProps, ref) => {
  const { values, errors, touched, handleChange, handleBlur } = formik;
  const error = errors[name];
  const isTouched = touched[name];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        value={values[name] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full bg-gray-100 text-xs px-3 py-2 rounded border outline-none transition
          ${isTouched && error ? "border-red-500 ring-2 ring-red-200" : "border-gray-300 focus:ring-1 focus:ring-slate-500"}`}
      />

      {isTouched && error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
}
);

FormInput.displayName = "FormInput";

export default FormInput;
