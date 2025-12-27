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
          <select className="input">
            <option>User</option>
            <option>Seller</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded text-sm"
        >
          Login
        </button>
      </form>

      {/* Bottom text */}
      <p className="text-sm italic mt-8">
        Dont have an account?{" "}
        <Link href="/signup" className="font-semibold not-italic">
          Create one.
        </Link>
      </p>
    </>
  );
}
