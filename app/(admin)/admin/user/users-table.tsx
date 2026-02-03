"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/axios";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u: any) => (
          <tr key={u._id}>
            <td>{u.email}</td>
            <td>{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
