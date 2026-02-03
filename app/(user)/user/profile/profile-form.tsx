"use client";

import api from "@/lib/api/axios";
import { getUser } from "@/lib/api/auth";

export default function ProfileForm() {
  const user = getUser();

  const submit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    await api.put(`/auth/${user._id}`, formData);
    alert("Profile updated");
  };

  return (
    <form onSubmit={submit}>
      <h2>My Profile</h2>

      <input name="fullName" placeholder="Full Name" />
      <input type="file" name="image" />

      <button>Update</button>
    </form>
  );
}
