"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../schema";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
    router.push("/auth/dashboard");
  };

  return (
    <>
      <h1 className="text-3xl font-black text-center mb-8">WELCOME</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="input mt-1"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="input mt-1"
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Login
        </button>
      </form>

      <p className="text-sm mt-6">
        Don’t have an account?{" "}
        <Link href="/signup" className="underline">
          Create one
        </Link>
      </p>
    </>
  );
}
