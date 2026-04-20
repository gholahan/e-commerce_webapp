import { useFormik } from "formik"
import * as Yup from "yup"
import { login } from "../feautures/auth/auth.api"

const LoginPage = () => {
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
      await login(values.userName, values.password)
      setSubmitting(false)
    },
  })

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = formik

  return (
  <div className="min-h-screen flex bg-white">

    {/* Left visual area */}
    <aside className="hidden lg:flex relative w-[52%] bg-[#0f0d0b] overflow-hidden flex-col justify-end">
        <img
          src="/images/authImage.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-70 hover:opacity-60 transition"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

        <div className="relative z-10 p-10 text-white">
          <p className="text-4xl tracking-widest font-light font-serif">
            Exclusive
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
            Curated for the discerning
          </p>
          <div className="w-8 h-px bg-[#c0392b] mt-5" />
        </div>
      </aside>

    {/* Right form area */}
     <main className="flex-1 flex items-center justify-center bg-white px-6 sm:px-10 lg:px-20 relative">
       <div className="flex flex-1 items-center justify-center  lg:px-16 px-20">
      
      {/* BREATHING CONTAINER */}
      <div className="w-full max-w-sm">
        
        <h1 className="text-xl md:text-2xl font-semibold mb-2">
          Log in to Exclusive
        </h1>

        <p className="text-gray-500 text-sm mb-7">
          Enter your details below
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="flex flex-col">
            <input
              name="userName"
              type="text"
              placeholder="Username"
              value={values.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-b border-gray-400 outline-none py-2 text-sm focus:border-red-500 transition"
            />
            {touched.userName && errors.userName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.userName}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-b border-gray-400 outline-none py-2 text-sm focus:border-red-500 transition"
            />
            {touched.password && errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-red-500 text-white px-5 py-2 text-sm rounded-sm hover:bg-red-700 transition"
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

            <a
              href="#"
              className="text-xs text-red-500 hover:underline text-center sm:text-left"
            >
              Forgot Password?
            </a>
          </div>

        </form>

      </div>
    </div>
     </main>
  </div>
)

}

export default LoginPage
