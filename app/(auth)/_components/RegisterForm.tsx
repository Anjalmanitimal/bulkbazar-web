"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterData } from "../schema";
import Link from "next/link";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-4xl font-black text-center mb-10">WELCOME</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            {...register("name")}
            placeholder="Enter your name"
            className="input"
          />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            className="input"
          />
          <p className="error">{errors.email?.message}</p>
        </div>

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

        <div>
          <label className="block text-sm font-semibold mb-1">SignUp As</label>
          <select className="input">
            <option>User</option>
            <option>Seller</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm">
          SignUp
        </button>
      </form>

      <p className="text-sm italic mt-8">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold not-italic">
          Login
        </Link>
      </p>
    </>
  );
}
