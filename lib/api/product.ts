import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

export const getAllProducts = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data; // adjust if needed
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
