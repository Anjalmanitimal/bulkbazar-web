import axios from "./axios";

/* ================= GET PROFILE ================= */
export const getProfileAPI = async () => {
  const res = await axios.get("/api/auth/profile");
  return res.data.data;
};

/* ================= GET MY ORDERS ================= */
export const getMyOrdersAPI = async () => {
  const res = await axios.get("/api/orders/my-orders");
  return res.data.data;
};

/* ================= DELETE ORDER ================= */
export const deleteOrderAPI = async (orderId: string) => {
  const res = await axios.delete(`/api/orders/${orderId}`);
  return res.data;
};

/* ================= UPDATE PROFILE ================= */
export const updateProfileAPI = async (userId: string, data: FormData) => {
  const res = await axios.put(`/api/auth/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};

/* ================= UPLOAD PROFILE IMAGE ================= */
export const uploadProfileImageAPI = async (file: File) => {
  const formData = new FormData();

  formData.append("profileImage", file);

  const res = await axios.post("/api/auth/profile/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};
