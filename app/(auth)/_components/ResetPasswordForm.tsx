"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordData } from "../schema";
import { resetPassword } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      const res = await resetPassword(token, data.password);
      alert(res.message);
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-black text-center mb-10">Reset Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1">
            New Password
          </label>
          <input type="password" {...register("password")} className="input" />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="input"
          />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded text-sm w-full"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
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
