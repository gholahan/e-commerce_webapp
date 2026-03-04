import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../feautures/auth/auth.api";

const LoginPage = () => {;

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Required"),
      password: Yup.string().min(6, "Too short").required("Required"),
    }),
   onSubmit: async (values, { setSubmitting }) => {
        await login(values.userName, values.password);
        setSubmitting(false);   
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = formik;

  return (
    <div className="flex min-h-screen pt-11">
      <div className="flex-1 pr-6">
        <img
          src="/images/authImage.jpg"
          alt="auth"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-end pr-10">
        <div className="w-full max-w-lg flex flex-col space-y-6">
          <p className="text-5xl font-medium text-black">
            Log in to Exclusive
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="flex flex-col">
              <input
                name="userName"
                type="text"
                placeholder="Username"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-b border-gray-400 outline-none py-2 focus:border-blue-500"
              />
              {touched.userName && errors.userName && (
                <div role="alert" className="text-red-500 text-sm mt-1">
                  {errors.userName}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-b border-gray-400 outline-none py-2 focus:border-blue-500"
              />
              {touched.password && errors.password && (
                <div role="alert" className="text-red-500 text-sm mt-1">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-500 text-white px-4 py-2 rounded transition hover:bg-red-600 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex gap-1 justify-center items-center">
                    <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></div>
                    <span>Logging you in...</span>
                  </div>
                ) : (
                 <span>Log in</span>
                )}
              </button>

              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
