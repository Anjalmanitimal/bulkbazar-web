import axios from "axios";
import { getAuthToken } from "../cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAdminUsers = async () => {
  const token = getAuthToken();

  const res = await axios.get(`${API_URL}/api/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
