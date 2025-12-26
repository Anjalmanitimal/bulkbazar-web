"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaType } from "../schema";
import Link from "next/link";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupSchemaType) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="text-3xl font-black text-center mb-8">WELCOME</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input {...register("name")} className="input mt-1" />
          <p className="error">{errors.name?.message}</p>
        </div>

        <div>
          <label className="text-sm font-semibold">Email</label>
          <input {...register("email")} className="input mt-1" />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            {...register("password")}
            className="input mt-1"
          />
          <p className="error">{errors.password?.message}</p>
        </div>

        <div>
          <label className="text-sm font-semibold">SignUp As</label>
          <select className="input mt-1">
            <option>User</option>
            <option>Seller</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Register
        </button>
      </form>

      <p className="text-sm mt-6">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </>
  );
}
