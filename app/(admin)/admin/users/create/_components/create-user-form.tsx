"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createAdminUser } from "@/lib/api/user";

type FormDataType = {
  fullName: string;
  email: string;
  password: string;
  role: "seller" | "customer";
  image?: FileList;
};

export default function CreateUserForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormDataType>();

  const onSubmit = async (data: FormDataType) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await createAdminUser(formData);

      alert("User created successfully");
      router.push("/admin/users");
    } catch (err: any) {
      alert(err.message || "Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <input
        {...register("fullName")}
        placeholder="Full Name"
        className="input"
      />

      <input {...register("email")} placeholder="Email" className="input" />

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="input"
      />

      <select {...register("role")} className="input">
        <option value="seller">Seller</option>
        <option value="customer">Customer</option>
      </select>

      <input type="file" {...register("image")} />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create User
      </button>
    </form>
  );
}
