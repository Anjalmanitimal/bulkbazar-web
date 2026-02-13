import axios from "./axios";

export const getAdminUsers = async () => {
  const res = await axios.get("/api/admin/users");

  // BACKEND RESPONSE:
  // { success: true, data: [...] }

  return res.data.data; // ✅ ARRAY ONLY
};

export const deleteAdminUser = async (id: string) => {
  const res = await axios.delete(`/api/admin/users/${id}`);
  return res.data;
};
