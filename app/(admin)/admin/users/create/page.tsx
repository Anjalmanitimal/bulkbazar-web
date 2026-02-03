"use client";

import api from "@/lib/api/axios";

export default function CreateUserPage() {
  const submit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await api.post("/admin/users", formData);
    alert("User created");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create User</h2>

      <input name="email" />
      <input name="password" />
      <input name="fullName" />

      <select name="role">
        <option value="customer">Customer</option>
      </select>

      <input type="file" name="image" />
      <button>Create</button>
    </form>
  );
}
