"use client";

import { useEffect, useState } from "react";
import { getAdminUsers, deleteAdminUser } from "@/lib/api/user";

type User = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAdminUsers();

      console.log("USERS IN TABLE:", data);

      setUsers(data);
    } catch (err: any) {
      console.error("ADMIN USERS ERROR:", err?.response || err);
      alert(err?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    await deleteAdminUser(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={4} className="p-4 text-center">
              No users found
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.fullName}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 capitalize">{user.role}</td>
              <td className="p-2 space-x-2">
                <a href={`/admin/users/${user._id}`} className="text-blue-600">
                  View
                </a>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
