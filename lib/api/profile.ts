import axios from "./axios";

export const getProfileAPI = async () => {
  const res = await axios.get("/api/auth/profile");
  return res.data.data;
};

export const getMyOrdersAPI = async () => {
  const res = await axios.get("/api/orders/my-orders");
  return res.data.data;
};
