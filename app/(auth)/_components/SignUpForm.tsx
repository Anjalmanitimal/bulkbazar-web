"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaType } from "../schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupSchemaType) => {
    console.log(data);
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Name" className="input" />
      <p className="error">{errors.name?.message}</p>

      <input {...register("email")} placeholder="Email" className="input" />
      <p className="error">{errors.email?.message}</p>

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="input"
      />
      <p className="error">{errors.password?.message}</p>

      <button className="btn">Register</button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
}
