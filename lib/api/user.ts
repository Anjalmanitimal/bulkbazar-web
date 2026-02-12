import axios from "axios";
import { getAuthToken } from "@/lib/cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAdminUsers = async () => {
  const token = await getAuthToken();

  const res = await axios.get(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteAdminUser = async (id: string) => {
  const token = await getAuthToken();

  await axios.delete(`${API_URL}/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
