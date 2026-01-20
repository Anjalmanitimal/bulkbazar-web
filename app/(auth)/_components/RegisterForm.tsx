"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterData } from "../schema";
import Link from "next/link";
import { register as registerUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await registerUser(data);
      console.log("REGISTER RESPONSE:", res);

      alert("Registration successful. Please login.");
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-black text-center mb-10">WELCOME</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            {...register("name")}
            placeholder="Enter your name"
            className="input"
          />
          <p className="error">{errors.name?.message}</p>
        </div>

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
          <label className="block text-sm font-semibold mb-1">Sign Up As</label>
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
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm italic mt-8 text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold not-italic">
          Login
        </Link>
      </p>
    </>
  );
}
