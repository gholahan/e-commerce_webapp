import { Formik } from "formik"
import * as Yup from "yup"
import { useUser } from "../feautures/auth/useUser"
import FormInput from "../shared/components/FormInput"
import Breadcrumbs from "../shared/components/BreadCrumbs"

const ProfilePage = () => {
  const { data: user } = useUser()

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    currentPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmNewPass: Yup.string(),
  })

  const initialValues = {
    firstname: user?.firstName || "",
    lastname: user?.lastName || "",
    email: user?.email || "",
    address: user?.address?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPass: "",
  }

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Profile updated:", values)
    // TODO: Call API to update profile
  }

  return (
    <>
    <div className="flex items-center justify-between mb-6">
        <Breadcrumbs />

        <p className="text-sm text-gray-600">
          Welcome! 
          <span className="font-semibold text-red-600 ml-1">
            {user?.firstName}
          </span>
        </p>
      </div>
    <div className="flex max-w-7xl mx-auto gap-7 px-4 sm:px-0 md:px-6">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col gap-6 sticky top-6">
        <div>
          <h2 className="font-semibold mb-3">Manage My Account</h2>
         <div className="pl-7">
           <div className="flex flex-col gap-2 text-gray-600 ">
            <div className="hover:text-gray-900 cursor-pointer">My Profile</div>
            <div className="hover:text-gray-900 cursor-pointer">Address Book</div>
            <div className="hover:text-gray-900 cursor-pointer">My Payment Options</div>
          </div>
         </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3">My Orders</h2>
         <div className="pl-7">
           <div className="flex flex-col gap-2 text-gray-600">
            <div className="hover:text-gray-900 cursor-pointer">My Returns</div>
            <div className="hover:text-gray-900 cursor-pointer">My Cancellations</div>
          </div>
         </div>
        </div>

        <h2 className="font-bold text-gray-600">My Wishlist</h2>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-14">
          <p className="text-red-600 mb-6 font-semibold text-lg">Edit Your Profile</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full">

                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="First Name"
                    name="firstname"
                    formik={formik}
                  />

                  <FormInput
                    label="Last Name"
                    name="lastname"
                    formik={formik}
                  />
                </div>

                {/* Email & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    formik={formik}
                  />

                  <FormInput
                    label="Address"
                    name="address"
                    formik={formik}
                  />
                </div>

                {/* Password Change */}
               <div className="flex flex-col gap-5 mt-4">
                  <p className="font-medium">Password Changes</p>

                  <FormInput
                    label=""
                    name="currentPassword"
                    placeholder="Cureent Password"
                    type="password"
                    formik={formik}
                  />

                  <FormInput
                    label=""
                    name="newPassword"
                    placeholder="new Pasword"
                    type="password"
                    formik={formik}
                  />

                  <FormInput
                    label=""
                    name="confirmNewPass"
                    placeholder="confirm New Password"
                    type="password"
                    formik={formik}
                  />
                </div>
                       {/*buttons*/}
               <div className="flex justify-end gap-3.5">
                <button className="px-5 py-3 bg-gray-200 text-black rounded hover:bg-gray-400">
                  Cancel
                </button>

                <button className="px-7 py-3 bg-red-600 text-white rounded hover:bg-red-800">
                  Save changes
                </button>
              </div>
              </form>
            )}
          </Formik>
        </div>
      </main>
    </div>
    </>
  )
}

export default ProfilePage
