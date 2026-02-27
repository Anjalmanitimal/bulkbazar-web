import axios from "./axios";

export const createOrderAPI = async (items: any[], total: number) => {
  const res = await axios.post("/api/orders", {
    items,
    total,
  });

  return res.data;
};
