/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { HOMEOWNER, SERVICEPROVIDER } from "@/utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { initialState, updateBasicInfo } from "../../store/feature/userRegistrationSlice";
import LogoHeader from "../common/LogoHeader";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    phone: yup.string().required("Phone is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    userType: yup.string().required("User type is required"),
  })
  .required();

export default function BasicInfoForm({ onNext }: any) {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(
    (state) => state.userRegistration.createUserObj
  );
  const userRegInfo = useAppSelector(
    (state: RootState) => state.userRegistration.createUserObj
  );
  console.log(userRegInfo);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      userType: formData.userType || "",
    },
  });
  // Watch the userType value
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userType = watch("userType");
  // Handle radio change
  const handleUserTypeChange = (type: string) => {
    setValue("userType", type);
    
    const updateObj = {
      userType: type,
      isHomeowner: type === HOMEOWNER,
      isServiceProvider: type === SERVICEPROVIDER,
      // Reset to initial state values
      ...(type === HOMEOWNER 
        ? { serviceProvider: initialState.createUserObj.serviceProvider } 
        : { homeOwner: initialState.createUserObj.homeOwner })
    };

    dispatch(updateBasicInfo(updateObj));
    trigger("userType");
  };
  const onSubmit = (data: any) => {
    const updatedData = {
      ...data,
      isHomeowner: data.userType === HOMEOWNER,
      isServiceProvider: data.userType === SERVICEPROVIDER,
    };
    console.log("Form data:", updatedData);
    dispatch(updateBasicInfo(updatedData));
    onNext();
  };

  return (
    <div>
      <div className="flex justify-center py-4">
        <LogoHeader />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl text-center font-bold mb-6">New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("firstName")}
              placeholder="First Name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone")}
              type="number"
              name="phone"
              placeholder="Phone"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("city")}
              placeholder="City"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("state")}
              placeholder="State"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("zip")}
              placeholder="ZIP"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                errors.zip ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
            )}
          </div> */}
        </div>
        <div>
          <p className="text-gray-700 mt-6 mb-4">
            Are you a homeowner or a service provider?{" "}
            <span className="text-red-500">*</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              className={`
              relative flex flex-col p-4 border-2 rounded-lg cursor-pointer
              ${
                formData.userType === HOMEOWNER
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2
                    ${
                      formData.userType === HOMEOWNER
                        ? "border-blue-600"
                        : "border-gray-300"
                    }
                    flex items-center justify-center
                  `}
                  >
                    {formData.userType === HOMEOWNER && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </div>
                <input
                  {...register("userType")}
                  type="radio"
                  value="homeowner"
                  onChange={() => handleUserTypeChange(HOMEOWNER)}
                  checked={formData.userType === HOMEOWNER}
                  className="hidden"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-700">
                    Homeowner
                  </span>
                  <span className="text-sm text-gray-500">
                    Continue as a homeowner
                  </span>
                </div>
              </div>
            </label>

            <label
              className={`
              relative flex flex-col p-4 border-2 rounded-lg cursor-pointer
              ${
                formData.userType === SERVICEPROVIDER
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`
                    w-5 h-5 rounded-full border-2
                    ${
                      formData.userType === SERVICEPROVIDER
                        ? "border-blue-600"
                        : "border-gray-300"
                    }
                    flex items-center justify-center
                  `}
                  >
                    {formData.userType === SERVICEPROVIDER && (
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                </div>
                <input
                  {...register("userType")}
                  type="radio"
                  value="serviceProvider"
                  onChange={() => handleUserTypeChange(SERVICEPROVIDER)}
                  checked={formData.userType === SERVICEPROVIDER}
                  className="hidden"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-700">
                    Service Provider
                  </span>
                  <span className="text-sm text-gray-500">
                    Continue as a service provider
                  </span>
                </div>
              </div>
            </label>
          </div>
          {errors.userType && (
            <div className="flex items-center text-red-500 text-sm mt-1">
              {errors.userType?.message}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            className="bg-[#12233A] text-white  py-2 px-4 rounded-md hover:opacity-90 focus:outline-none"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
