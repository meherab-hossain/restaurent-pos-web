/* eslint-disable @typescript-eslint/no-explicit-any */
// LoginForm.tsx
import LogoHeader from "@/components/common/LogoHeader";
import cookies from "@/utils/cookies";
import { http } from "@/utils/http";
import { ButtonSpinnerSvg } from "@/utils/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import LoginSchema from "../../utils/yup/LoginSchema";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [serverError, setServerError] = useState({} as any);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (data: LoginFormData) => {
    const formData = {
      email: data.email,
      password: data.password,
    };
    setProcessing(true);

    http
      .post("/login", formData)
      .then((res: any) => {
        console.log('Login response:', res);

        if (!res?.data?.accessToken || !res?.data?.user) {
          throw new Error('Invalid response format');
        }

        const { user, accessToken } = res.data;
        
        const cookieOptions = {
          path: '/',
          secure: true,
          sameSite: 'strict'
        };

        cookies.set("access_token", accessToken, cookieOptions);
        cookies.set("user", JSON.stringify(user), cookieOptions);

        toast.success("Login successful", {
          duration: 3000,
        });

        router.push("/dashboard");
      })
      .catch((err: any) => {
        console.error("Login error details:", {
          response: err?.response,
          data: err?.response?.data,
          message: err?.message
        });

        setServerError(err?.response?.data?.errors || {});
        
        const errorMessage = err?.response?.data?.message 
          || err?.message 
          || "Login failed. Please try again.";
        
        toast.error(errorMessage, {
          duration: 3000,
        });
      })
      .finally(() => {
        setProcessing(false);
      });
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
                  errors.email || serverError?.["email"] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email"
              />
              {(errors.email || serverError?.["email"]) && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.email?.message || serverError?.["email"]}
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
                  errors.password || serverError?.["password"] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter password"
              />
              {(errors.password || serverError?.["password"]) && (
                <p className="mt-1 text-sm text-red-500">
                  {errors?.password?.message || serverError?.["password"]}
                </p>
              )}
            </div>
          </div>

          <button
              type="submit"
              disabled={processing}
              className={`w-full bg-[#12233A] text-white py-2 px-4 rounded-md hover:opacity-90 focus:outline-none  ${
                processing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {processing ? (
                <div className="flex items-center justify-center gap-2">
                  <ButtonSpinnerSvg />
                  Processing...
                </div>
              ) : (
                "Login"
              )}
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
