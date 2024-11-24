// LoginForm.tsx
import LogoHeader from "@/components/common/LogoHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import LoginSchema from "../../utils/yup/LoginSchema";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Here you would typically make an API call
      console.log("Form data:", data);

      // Reset form after successful submission
      reset();
      router.push("/dashboard");
      // Show success message (you might want to handle this with a toast notification)
      // alert("Login successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="min-w-[300px] max-w-2xl border m-2 md:mx-auto p-6 bg-white rounded-lg shadow">
        <div className="flex justify-center py-4">
          <LogoHeader />
        </div>
        <h2 className="text-2xl font-bold mb-6">
          Sign in to access your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6">
            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                {...register("password")}
                type="password"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#12233A] text-white py-2 px-4 rounded-md hover:opacity-90 focus:outline-none  ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Processing..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-4">
          New User?{" "}
          <Link href="/register" className="underline">
            Register Here
          </Link>
        </p>
        <p className="text-center mt-4">
          <Link href="/forgot-password" className="underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
