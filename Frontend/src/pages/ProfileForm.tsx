import { Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "../feautures/auth/useUser";
import FormInput from "../shared/components/FormInput";

const ProfileForm = () => {
  const { data: user } = useUser();

  const initialValues = {
    firstname: user?.firstName || "",
    lastname: user?.lastName || "",
    email: user?.email || "",
    address: user?.address?.address || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPass: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    currentPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmNewPass: Yup.string(),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Profile updated:", values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput label="First Name" name="firstname" formik={formik} placeholder={user?.firstName} />
            <FormInput label="Last Name" name="lastname" formik={formik} placeholder={user?.lastName}/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput label="Email" name="email" type="email" formik={formik} placeholder={user?.email}/>
            <FormInput label="Address" name="address" formik={formik} placeholder={user?.address.address}/>
          </div>

          <div className="flex flex-col gap-5 mt-4">
            <p className="font-medium">Password Changes</p>
            <FormInput label="" name="currentPassword" placeholder="Current Password" type="password" formik={formik} />
            <FormInput label="" name="newPassword" placeholder="New Password" type="password" formik={formik} />
            <FormInput label="" name="confirmNewPass" placeholder="Confirm New Password" type="password" formik={formik} />
          </div>

          <div className="flex justify-end gap-3.5">
            <button className="px-5 py-3 bg-gray-200 text-black rounded hover:bg-gray-400">Cancel</button>
            <button className="px-7 py-3 bg-red-600 text-white rounded hover:bg-red-800">Save changes</button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ProfileForm;
