"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordData } from "../schema";
import { requestPasswordReset } from "@/lib/api/auth";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const res = await requestPasswordReset(data.email);
      alert(res.message);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-black text-center mb-10">Forgot Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="input"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded text-sm w-full"
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-sm italic mt-8 text-center">
        Back to{" "}
        <Link href="/login" className="font-semibold not-italic">
          Login
        </Link>
      </p>
    </>
  );
}
