"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "../schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api/auth";
import { setAuthToken, setUserData } from "@/lib/cookie";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await login(data);

      console.log("LOGIN RESPONSE:", res);

      await setAuthToken(res.token);
      await setUserData(res.user);

      router.push("/auth/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-black text-center mb-10">WELCOME</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="input"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="input"
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-semibold mb-1">Login As</label>
          <select {...register("role")} className="input">
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
          <p className="error">{errors.role?.message}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded text-sm w-full"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm italic mt-8 text-center">
        Don’t have an account?{" "}
        <Link href="/signup" className="font-semibold not-italic">
          Create one
        </Link>
      </p>
    </>
  );
}
